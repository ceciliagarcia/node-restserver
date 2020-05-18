require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// habilitar el archivo de public
app.use(express.static(path.resolve(__dirname, '../public')));


// importamos la configuracion global de rutas
app.use(require('./routes/index'));


/*mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});*/
mongoose.connect(process.env.URLDB, {

    useNewUrlParser: true,
    useCreateIndex: true


}, (err, resp) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});


app.listen(process.env.PORT, () => console.log('Escuchado el puerto:', process.env.PORT));