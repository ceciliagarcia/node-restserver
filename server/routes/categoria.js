const express = require('express');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/authentication');

let app = express();

let Categoria = require('../models/categoria');


//=============================
// Mostrar todas las categorias
//=============================
app.get('/categoria', verificaToken, (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });
    Categoria.find({}).populate('usuario', 'nombre email')
        .sort('descripcion')
        .exec((err, categorias) => {

            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({});
            ok: true,
                categorias
        });
});

//=============================
// Mostrar Una Categoria por id
//=============================
app.get('/categoria/:id', verificaToken, (req, res) => {
    // categoria.findById
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            res.status(500).json({
                ok: false,
                err: {
                    message: 'El id no es valido'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

//=============================
// Crear nueva categoria
//=============================
app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});
//=============================
// Actualizar el nombre de la categoria 
//=============================
app.put('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });
});
//=============================
// Borrar categorias
//=============================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    // solo un administrador pueda borrar categoria
    // categoria.finbyidremove
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaBorrada) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaBorrada) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id no existe'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Categoria Borrada'
        });
    });

});



module.exports = app;