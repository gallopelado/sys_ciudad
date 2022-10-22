const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Session-persisted message middleware
router.use(function(req, res, next){
    const err = req.session.error;
    const msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

/**
 * Autenticación de usuario
 * @example https://github.com/expressjs/express/blob/master/examples/auth/index.js
 * @param {*} name 
 * @param {*} pass 
 * @param {*} fn 
 * @returns 
 */
async function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    try {
        const userFound = await db.any('SELECT nick, pass, email FROM public.users WHERE nick=$1 AND pass=$2', [name, pass])
        if(!Array.isArray(userFound) || userFound.length===0) return fn('No existe este user', null, null)
        else {
            let { nick, email } = userFound[0];
            if(!nick) return fn(null, null)
            return fn(null, nick, email)
        }
    } catch (error) {
        console.error(error)
    }
  }

function restrict(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      req.session.error = 'Access denied!';
      res.redirect('/login');
    }
}

router.get('/auth', (req, res) => {
    if(req.session.nick){        
        res.render('index', { 
            user: req.session.nick,
            email: req.session.email 
        });        
    } else {
        res.render('sesion/login');        
    }
    
});

router.get('/procesar', (req, res) => {
    res.render('sesion/login')
})

router.post('/procesar', (req, res, next) => {
    const { user, pass } = req.body;
    authenticate(user, pass, (err, nick, email) => {
        if(err) {
            //return next(err)
            req.session.error = 'Authentication failed, please check your username and password.'
            return res.redirect('/procesar')
        }
        if(nick) {
            req.session.regenerate(() => {
                req.session.nick = nick;
                req.session.email = email;
                req.session.success = 'Authenticated as ' + nick + ' click to <a href="/logout">logout</a>. '
                res.redirect('/')
            })
        } else {
            req.session.error = 'Authentication failed, please check your username and password.'
            res.redirect('/procesar')
        }
    })
});

router.get('/logout', (req, res) => {
    // if(req.session.nick){
    //     req.session.nick = null;
    //     res.redirect('/auth');
    // }
    req.session.destroy(() => {
        res.redirect('/')
    })
});

module.exports = router;