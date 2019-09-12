const express = require('express');
const router = express.Router();
//const pM = require('../models/personas');
const mercaM = require('../models/mercaderias');
const pM = require('../models/personasAsyn');
router.get('/ventas', async(req, res) => {
    if (req.session.nick) {
        /*pM.get_personas()
            .then(data => {
                mercaM.get_mecaderias();
                return data;                               
            })
            .then(merca => {
                console.log(merca);
                console.log(data);
                res.render('ventas/index', {
                    user: req.session.nick,
                    email: req.session.email,
                    data: data
                });
            })
            .catch(error => {
                res.status(500).end();
            }); */
            try {
                console.time('Midiendo1 ');
                let personas = await pM.get_personas();
                console.timeEnd('Midiendo1 ');  
                console.time('Midiendo2 ');
                let mercaderias = await mercaM.get_mecaderias(); 
                //const resultados = await Promise.all([pM.get_personas(), mercaM.get_mecaderias()]);
                console.timeEnd('Midiendo2 ');             
                res.render('ventas/index', {
                    user: req.session.nick,
                    email: req.session.email,
                    data: personas, mercaderias
                    //data:resultados[0], 
                    //mercaderias: resultados[1]
                });
            } catch (error) {
                console.log(error);
            }       
    }
    else
        res.redirect('/auth');
});


module.exports = router;