//Puerto

process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//Vencimiento del token
process.env.CADUCIDAD_TOKEN = '48h';

// SEED autenticacion
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//Base de datos

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//Google client

process.env.CLIENT_ID = process.env.CLIENT_ID || '221674221326-udvnakqbv1qfga89jtc9d829q6pjej7r.apps.googleusercontent.com';