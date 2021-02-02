/* Definición del modelo para la base de datos de los usuarios */

const mongoose = require('mongoose');

//SCHEMA-USUARIO
let usuarioSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
        trim: true,
    }
});

let Usuario = mongoose.model('usuario', usuarioSchema);

module.exports = Usuario;