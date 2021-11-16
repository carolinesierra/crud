const path = require('path'); //modulo encargado para unir dorectorios
const express = require('express');
const morgan = require('morgan');
const app = express();

//imprtacion de rutas
const indexRoutes = require('./routes/index');


//configuraciones
app.set('port', process.env.PORT || 3000); //de no existir el puerto del sistema, tomara el puerto 3000
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
//rutas
app.use('/', indexRoutes);

//inicializar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});