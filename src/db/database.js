const pgp = require('pg-promise')(/*options*/);
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'db_tikets',
    user: 'postgres',
    password: 'dgtic123',
    max: 30 // use up to 30 connections
}
const db = pgp(cn)
/*const CnDc = {
    host: '127.0.0.1',
    port: 54220,
    database: 'datacenter_new',
    user: 'historian',
    password: 'hishis21t',
    max: 30 // use up to 30 connections
}
const dbDataCenter = pgp(CnDc)*/

module.exports = db;
//module.exports = dbDataCenter;