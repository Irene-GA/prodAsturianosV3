/*
    Despliegue de los servicios de losp roductos, Insertar, Modificar y
    Borrar Productos y Comentarios de los productos
*/

const express = require('express');
const multer = require('multer');

let Producto = require(__dirname + '/../models/producto.js');
let autentication = require(__dirname + '/../utils/auth.js');
let router = express.Router();

//Midlewere para subir archivos, imagenes.
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname)
    }
})
let upload = multer({ storage: storage });

// Servicio de listado general
router.get('/', autentication, (req, res) => {
    Producto.find().then(resultado => {
        res.render('admin_productos', { productos: resultado });
    }).catch(error => {
        res.render('admin_error', { error: "" })
    });
});

//Servicio de Renderizado de Formulario
router.get('/productos/nuevo', autentication, (req, res) => {
    res.render('admin_productos_form');
});

//Servicio de Renderizado de Formulario de editar
router.get('/productos/editar/:id', autentication, (req, res) => {
    Producto.findById(req.params.id).then(resultado => {
        if (resultado) {
            res.render('admin_productos_form', { producto: resultado });
        } else {
            res.render('admin_error', { error: "Producto no encontrado" });
        }
    }).catch(error => {
        res.render('admin_error', { error: "" });
    });
})

// Servicio para insertar productos
router.post('/productos', upload.single('imagen'), autentication, (req, res) => {
    let nuevoProd = new Producto({
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        imagen: req.file.filename
    });
    nuevoProd.save().then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', { error: "" });
    });
});

// Servicio para modificar producto
router.put('/productos/:id', upload.single('imagen'), autentication, (req, res) => {
    /*let nuevaImagen = req.file.filename;
    console.log(nuevaImagen);
    if (nuevaImagen != "") {
        Producto.findByIdAndUpdate(req.params.id, {
            $set: {
                imagen: req.file.filename
            }
        }, { new: true }).then(resultado => {
            res.redirect(req.baseUrl);
        }).catch(error => {
            res.render('admin_error', { error: "" });
        });
    } else {*/
    Producto.findByIdAndUpdate(req.params.id, {
        $set: {
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            //imagen: req.file.filename
        }
    }, { new: true }).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', { error: "" });
    });
    //}
});

// Servicio para borrar producto
router.delete('/productos/:id', autentication, (req, res) => {
    Producto.findByIdAndRemove(req.params.id).then(resultado => {
        res.redirect(req.baseUrl);
    }).catch(error => {
        res.render('admin_error', { error: "" });
    });
});


//Servicio para borrar comentarios del producto
router.delete('/comentarios/:idProducto/:idComentario', autentication, (req, res) => {
    Producto.findById(req.params.idProducto).then(resultado => {
        Producto.findByIdAndRemove(req.params.idComentario).then(resultado => {
            if (resultado)
                res.render('publico_producto');
            else {
                res.render('admin_error', { error: "Error borrando comentario" });
            }
        }).catch(error => {
            res.render('admin_error', { error: "" });
        });
    });
});

module.exports = router;