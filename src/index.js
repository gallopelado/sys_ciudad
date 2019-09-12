const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const http = require('http');
const app = express();
const path = require('path');
const sesion = require('./rutas/sesion');
const rutas = require('./rutas/rutas');
const bodyParser = require('body-parser');
const morgan = require('morgan');   

// Configuraciones
//app.engine('ejs', require('express-ejs-extend'));
app.engine('ejs', require('ejs-mate'));
app.set('views', path.join(`${__dirname}/views/`));
app.set('view engine', 'ejs');

// Middlewares
//app.use(morgan('tiny'));
app.use(cookieParser());
app.use(session({secret: 'abcd1234'}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(sesion);
app.use(rutas);
app.use(express.static(path.join(`${__dirname}/public`)));



app.listen(4000, () => {
    console.log('Ejecutandose');
    console.log(path.join(`${__dirname}/public`));
});