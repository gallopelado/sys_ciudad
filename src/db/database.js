const pgp = require('pg-promise')(/*options*/);
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'db_despensa',
    user: 'postgres',
    password: 'dgtic123',
    max: 30 // use up to 30 connections
}
const db = pgp(cn)

module.exports = db;