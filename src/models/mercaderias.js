const mercaderiaModel = {};
const db = require('../db/database');

const get_mecaderias = () => db.any('SELECT * FROM mercaderias');    


mercaderiaModel.get_mecaderias = get_mecaderias;

module.exports = mercaderiaModel;