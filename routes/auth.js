/*
    Despliegue de los servicios de los productos, Login y Logout
*/

const express = require('express');
let router = express.Router();

//Encriptación de contraseñas
const SHA256 = require('crypto-js/sha256');
const CryptoJS = require("crypto-js");

let Usuario = require(__dirname + '/../models/usuario.js');

// Renderiza la vista del login
router.get('/login', (req, res) => {
    res.render('auth_login');
});

//Servicio de logeo de los usuarios
router.post('/login', (req, res) => {
    let usuario = req.body.usuario;
    let password = req.body.password;

    let passEncriptada = SHA256(password).toString(CryptoJS.enc.Hex);

    Usuario.find({
        login: usuario,
        password: passEncriptada
    }).then(resultado => {
        if (resultado.length > 0) {
            req.session.usuario = resultado;
            res.redirect('/admin');
        } else {
            res.render('auth_login', { error: "Usuario incorrecto" });
        }
    });
});

//Servicio de finalización de la sesión
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});


module.exports = router;