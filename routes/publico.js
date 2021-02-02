/* Enrutadores de la parte publica, buscar y buscar 
    por la id del producto
*/

const express = require('express');

let Producto = require(__dirname + '/../models/producto.js');
let router = express.Router();

// Vista del index
router.get('/', (req, res) => {
    res.render('publico_index');
});

//Buscar todos los productos
router.post('/buscar', (req, res) => {
    let buscar = req.body.buscarProd;
    let filter = [];
    //let resultadoFiltro;

    console.log(buscar + "->buscar value");
    Producto.find().then(resultado => {
        if (buscar == '' || buscar == undefined) {
            res.render('publico_index', { producto: resultado });
        } else {
            resultado.filter(p => {
                let name = p.nombre.toLowerCase();
                if (name.includes(buscar.toLowerCase())) {
                    // console.log("entra en el if del filter");
                    console.log(p);
                    filter = p;
                }
            });
            console.log("fuera del filtro: ->" + filter);
            res.render('publico_index', { producto: filter });
        }
    }).catch(error => {
        res.render('publico_error', { error: "" });
    });
});

//Setvicio de busqueda de productos por ID
router.get('/producto/:id', (req, res) => {
    Producto.findById(req.params.id).then(resultado => {
        if (resultado) {
            res.render('publico_producto', { producto: resultado });
        } else
            res.render('publico_error', { error: "Producto no encontrado" });
    }).catch(error => {
        res.render('publico_error', { error: "" })
    });
});

// Servicio para insertar comentarios del producto
router.post('/comentarios/:idProducto', (req, res) => {
    Producto.findByIdAndUpdate(req.params.idProducto, {
        $push: {
            comentarios: {
                nombreUsuario: req.body.nombreUsuario,
                comentario: req.body.comentario
            }
        }
    }, { new: true }).then(resultado => {
        res.redirect('/producto/' + req.params.idProducto);
    }).catch(error => {
        res.render('publico_error', { error: "" });
    });
});

//Servicio para borrar comentarios del producto
router.delete('/comentarios/:idProducto/:idComentario', (req, res) => {
    Producto.findById(req.params.idProducto).then(producto => {
        producto.comentarios = producto.comentarios.filter(comentario =>
            comentario.id != req.params.idComentario);
        producto.save().then(resultado => {
            res.redirect('/producto/' + req.params.idProducto);
        })
    }).catch(error => {
        res.render('publico_error', { error: "" });
    });
});


module.exports = router;


/*if (resultado) {
    if (buscar != undefined || buscar != '') {
        /*let productos =  //  result =
resultadoFilter = resultado.filter(p => {
    let name = p.nombre.toLowerCase();
    if (name.includes(buscar.toLowerCase())) {
        console.log("entra en el if del filter");
        //console.log("dentro del IF.includes() -> " + p);
        result = p;
        //res.render('publico_index', { producto: result });
        console.log(result);
        resultadoFilter = result;
    }
    console.log("RESULTADOD EL FILTRO ->" + resultadoFilter);
    //res.render('publico_index', { producto: resultadoFilter });
    // console.log(resultadoFilter);
    resultado = resultadoFilter;
});
console.log("fuera del filter");
console.log(resultado);
res.render('publico_index', { producto: resultado });
//console.log("RESULTADOD EL FILTRO ->" + resultadoFilter);
}
else {
    res.render('publico_error', { error: "Producto no encontrado" });
}
} else {
    res.render('publico_error', { error: "Producto no encontrado" });
}
}).catch(error => {
console.log("fuera del IF del FIND");
res.render('publico_error', { error: "" })
});
}); */

//---------------------------------------------------------------------------
//res.render('publico_index', { producto: result });
//res.render('publico_index', { mensaje: "No hay productos" })
//console.log("Fuera del IF del include");
//console.log(result);

//res.render('publico_index', { producto: resultadoFilter });

//console.log("fuera del IF tocho");
/* } else {
        res.render('publico_index', { producto: resultado });
    }
});*/