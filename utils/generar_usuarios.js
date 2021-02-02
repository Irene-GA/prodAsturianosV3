/* Inicialización de los usuarios para la parte privada
de la aplicación */

const mongoose = require('mongoose');
const SHA256 = require("crypto-js/sha256");
const CryptoJS = require("crypto-js");

const Usuario = require(__dirname + '/../models/usuario');

mongoose.connect('mongodb://localhost:27017/ProdAsturianosV3');
Usuario.collection.drop();

let usu1 = new Usuario({
    login: 'admin',
    password: SHA256('12345678').toString(CryptoJS.enc.Hex)
});
usu1.save();

let usu2 = new Usuario({
    login: 'usuario',
    password: SHA256('87654321').toString(CryptoJS.enc.Hex)
});
usu2.save();