const pgp = require('pg-promise')(/*options*/);
const CnDc = {
    host: '192.168.1.111',
    port: 5432,
    database: 'datacenter_new',
    user: 'historian',
    password: 'hishis21t',
    max: 30 // use up to 30 connections
}
const dbDataCenter = pgp(CnDc)
module.exports = dbDataCenter;