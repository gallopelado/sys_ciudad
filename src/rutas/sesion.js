const express = require('express');
const router = express.Router();
const db = require('../db/database');


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

router.post('/procesar', (req, res) => {
    let { user, pass } = req.body;
    db.any('SELECT * FROM users WHERE nick=$1 AND pass=$2', [user, pass])
    .then((data) => {        
        if(data.length != 0){
            let { nick, email } = data[0];            
            req.session.nick = nick;
            req.session.email = email;                       
            res.render('index', {
                user: req.session.nick,
                email: req.session.email
            });            
        } else {
            res.render('sesion/login');
            
        }        
    })
    .catch((error) => {
        console.error(error);
    })
});

router.get('/logout', (req, res) => {
    if(req.session.nick){
        req.session.nick = null;
        res.redirect('/auth');
    }
});

module.exports = router;