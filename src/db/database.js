const pgp = require('pg-promise')(/*options*/);
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'db_despensa',
    user: 'juandba',
    password: 'admin',
    max: 30 // use up to 30 connections
}
const db = pgp(cn)
//const db = pgp('postgres://juandba:admin@localhost:5432/db_despensa');

module.exports = db;