const pgp = require('pg-promise')(/*options*/);
const CnDc = {
    host: '',
    port: '',
    database: '',
    user: '',
    password: '',
    max: 30 // use up to 30 connections
}
const dbDataCenter = pgp(CnDc)
module.exports = dbDataCenter;