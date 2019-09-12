const personaModel = {};
const db = require('../db/database');

const get_personas = () => db.any('SELECT * FROM personas'); 
   


personaModel.get_personas = get_personas;

module.exports = personaModel;