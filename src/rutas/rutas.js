const express = require('express');
const router = express.Router();
//const ventas = require('./ventas');
const db = require('../db/database');
const dbaData = require('../db/dataBaseDatacenter');
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
        dbaData.any(`select codigo_departamento, nombre_departamento from departamento `)
    .then((data) => { 
       // console.log(data)               
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
    //console.log(req.body);
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

router.get('/establecimiento/:id',async (req, res, next) => {
  
    try {
        let id = req.params.id;
        if(id!='T'){
            const establecimientos = await dbaData.any(`SELECT pa.codigo_establecimiento ,(select nombre_establecimiento from establecimiento where pa.codigo_establecimiento=codigo_establecimiento) FROM paciente_asignacion pa JOIN consulta cu USING (codigo_asignacion,codigo_establecimiento) WHERE cu.creacion_usuario NOT IN ('222', '002', 'sysadmin') and substring(pa.codigo_establecimiento,3,2)=$1 GROUP BY pa.codigo_establecimiento ORDER BY pa.codigo_establecimiento`,[id])
            res.json( establecimientos) ; 
        }else{
            const establecimientos = await dbaData.any(`SELECT pa.codigo_establecimiento ,(select nombre_establecimiento from establecimiento where pa.codigo_establecimiento=codigo_establecimiento) FROM paciente_asignacion pa JOIN consulta cu USING (codigo_asignacion,codigo_establecimiento) WHERE  cu.creacion_usuario NOT IN ('222', '002', 'sysadmin') GROUP BY pa.codigo_establecimiento ORDER BY pa.codigo_establecimiento`)
            res.json( establecimientos) ; 
        }
    } catch (error) {
        console.error(error)
        next(error);
    }
});

router.get('/establecimiento_all',async (req, res, next) => {  
    try {
        let departamento = req.query.departamento;
        let establecimiento = req.query.establecimiento;
        let datepicker_desde = req.query.datepicker_desde;
        let datepicker_hasta = req.query.datepicker_hasta;
        if(departamento=='T' && establecimiento=='T'){
            const establecimientos = await dbaData.any(`SELECT pa.codigo_establecimiento ,(select nombre_establecimiento from establecimiento where pa.codigo_establecimiento=codigo_establecimiento) ,(select nombre_departamento from departamento where substring(pa.codigo_establecimiento,3,2)=codigo_departamento) ,COUNT(pa.codigo_establecimiento) FROM paciente_asignacion pa JOIN consulta cu USING (codigo_asignacion,codigo_establecimiento) WHERE pa.creacion_fecha BETWEEN $1 AND $2 AND cu.creacion_usuario NOT IN ('222', '002', 'sysadmin') GROUP BY pa.codigo_establecimiento ORDER BY pa.codigo_establecimiento`,[datepicker_desde,datepicker_hasta])
            res.json( establecimientos) ; 
        }else if(departamento!='T' && establecimiento=='T'){
            const establecimientos = await dbaData.any(`SELECT pa.codigo_establecimiento ,(select nombre_establecimiento from establecimiento where pa.codigo_establecimiento=codigo_establecimiento ) ,(select nombre_departamento from departamento where substring(pa.codigo_establecimiento,3,2)=codigo_departamento) ,COUNT(pa.codigo_establecimiento) as total FROM paciente_asignacion pa JOIN consulta cu USING (codigo_asignacion,codigo_establecimiento) WHERE pa.creacion_fecha BETWEEN $1 AND $2 AND cu.creacion_usuario NOT IN ('222', '002', 'sysadmin') and substring(pa.codigo_establecimiento,3,2)=$3 GROUP BY pa.codigo_establecimiento ORDER BY pa.codigo_establecimiento`,[datepicker_desde,datepicker_hasta,departamento])
            res.json( establecimientos) ; 
        }else{
            const establecimientos = await dbaData.any(`SELECT pa.codigo_establecimiento ,(select nombre_establecimiento from establecimiento where pa.codigo_establecimiento=codigo_establecimiento ) ,(select nombre_departamento from departamento where substring(pa.codigo_establecimiento,3,2)=codigo_departamento) ,COUNT(pa.codigo_establecimiento) as total FROM paciente_asignacion pa JOIN consulta cu USING (codigo_asignacion,codigo_establecimiento) WHERE pa.creacion_fecha BETWEEN $1 AND $2 AND cu.creacion_usuario NOT IN ('222', '002', 'sysadmin') and substring(pa.codigo_establecimiento,3,2)=$3 and pa.codigo_establecimiento=$4 GROUP BY pa.codigo_establecimiento ORDER BY pa.codigo_establecimiento`,[datepicker_desde,datepicker_hasta,departamento,establecimiento])
            res.json( establecimientos) ; 
        }
    } catch (error) {
        console.error(error)
        next(error);
    }
});
module.exports = router;