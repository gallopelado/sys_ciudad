const express = require('express');
const router = express.Router();
//const ventas = require('./ventas');
const db = require('../db/database');

//router.use(ventas);

router.get('/', (req, res) => {    
    if(req.session.nick) {
        res.render('index', {
            user: req.session.nick, email: req.session.email
        });        
    }else{
        res.redirect('/auth');        
    }    
});

router.get('/ciudad', (req, res) => {
    if(req.session.nick) {
    db.any('SELECT * FROM ciudades')
    .then((data) => {                
        res.render('ciudad/index', {data: data, user:req.session.nick, email:req.session.email });
    })
    .catch((error) => {
        console.error(error);
        res.send(error);
    });   
}else{
        res.redirect('/auth');
    }       
});

router.get('/ciudad/del/:id', (req, res) => {    
    if(req.session.nick) {
    let id = parseInt(req.params.id);    
    db.none('DELETE FROM ciudades WHERE id=$1', [id])
    .then((data) => {
        res.redirect('/ciudad');
    })
    .catch((error) => {
        res.redirect('/ciudad');
        console.log('ERROR DETECTADO ', error);
    });
}else {
    res.redirect('/auth');
}
});

router.get('/ciudad/nueva_ciudad', (req, res) => {
    if(req.session.nick) 
    res.render('ciudad/addCiudad', {
        user:req.session.nick,
        email: req.session.email
    });
    else
    res.redirect('/auth');
});

router.post('/ciudad/guardar_ciudad', (req, res) => {
    if(req.session.nick) {
   let ciudad =  req.body.descri;
    db.none('INSERT INTO ciudades(descri) VALUES(UPPER($1))', [ciudad])
    .then((data) => {
        res.redirect('/ciudad');
     })
     .catch((error) => {
         console.error('Error detectado ',error);
     });
    } else {
        res.redirect('/auth');
    }
});

router.get('/ciudad/mod/:id', (req, res) => {   
    if(req.session.nick) { 
    let idciudad = req.params.id;
    db.one('SELECT * FROM ciudades WHERE id=$1', [idciudad])
    .then((data) => {        
        res.render('ciudad/modCiudad', {
            data: data, 
            user:req.session.nick,
            email:req.session.email
        });
    })
    .catch((error) => {
        console.error('Error detectado ',error);
    });     
}else{
    res.redirect('/auth');
}
});
router.post('/ciudad/modificar_ciudad', (req, res) => {
    if(req.session.nick) { 
    console.log(req.body);
    let {id, descri} = req.body;        
     db.none('UPDATE ciudades SET descri=UPPER($1) WHERE id=$2', [descri, id])
     .then((data) => {
         res.redirect('/ciudad');
      })
      .catch((error) => {
          console.error('Error detectado ',error);
      });
    }else {
        res.redirect('/auth');
    }
 });

module.exports = router;