// Carga de librerías
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const methodOverride = require('method-override');
const session = require('express-session');

// Enrutadores
const productos = require(__dirname + '/routes/productos');
const publico = require(__dirname + '/routes/publico');
const auth = require(__dirname + '/routes/auth');

// Conectar con BD en Mongo 
mongoose.connect('mongodb://localhost:27017/ProdAsturianosV3', { useNewUrlParser: true }, { useFindAndModify: false }, { useCreateIndex: true });

// Inicializar Express
let app = express();

// Asignación del motor de plantillas
app.set('view engine', 'njk');
// Configuramos motor Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Middleware body-parser para peticiones POST y PUT
// Enrutadores para cada grupo de rutas
app.use(express.json());
app.use(express.urlencoded()); //para recoger datos del Formulario

// Middleware para procesar otras peticiones que no sean GET o POST
app.use(methodOverride(function(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false,
    expires: new Date(Date.now() + (30 * 60 * 1000))
}));

//Midlewere para comprobar la autentificación de la sesión
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
})

app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use('/admin', productos);
app.use('/auth', auth);
app.use('/', publico);

// Puesta en marcha del servidor
app.listen(8080);