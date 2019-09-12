const pgp = require('pg-promise')(/*options*/);
const db = pgp('postgres://juandba:admin@localhost:5432/db_despensa');

module.exports = db;