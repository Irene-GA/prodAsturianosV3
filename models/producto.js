/* Definición de los modelos para la base de datos de los productos
y de los comentarios de los productos*/

const mongoose = require('mongoose');

//SCHEMA-COMENTARIOS
let comentarioSchema = new mongoose.Schema([{
    nombreUsuario: {
        type: String,
        trim: true,
        required: true
    },
    comentario: {
        type: String,
        trim: true,
        required: true,
        minlength: 5
    }
}]);

//SCHEMA-PRODUCTO
let productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: 1
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String,
        trim: true
    },
    comentarios: [comentarioSchema]
});

let Producto = mongoose.model('producto', productoSchema);

module.exports = Producto;