const mongoose = require('mongoose');


const URI = 'mongodb://localhost:27017/crud';  //variable para guardar ruta de bd

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log('La Base de Datos esta conectada'))
  .catch(error => console.error(error));

module.exports = mongoose; 