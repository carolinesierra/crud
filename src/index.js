const path = require('path'); //modulo encargado para unir dorectorios
const express = require('express');
const morgan = require('morgan');

const { mongoose } = require('./database');
const app = express();


//configuraciones
app.set('port', process.env.PORT || 5000); //de no existir el puerto del sistema, tomara el puerto 5000


//middlewares
app.use(morgan('dev'));
app.use(express.json()); //comprobar si es formato json


//rutas
app.use('/api/tasks' ,require('./routes/task.routes'));

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));   //__dirname : utilizado para buscar ruta

//inicializar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});