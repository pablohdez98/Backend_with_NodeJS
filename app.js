'use strict'

// Cargar módulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar express (http)
var app = express();

// Cargar ficheros rutas

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS

// Añadir prefijos a rutas

// Ruta o método de prueba para el API REST
app.post('/probando', (req, res) => {
    return res.status(200).send({
        curso: 'Master en Udemy',
        autor: 'Pablo Hernández',
        url: 'pablohernandezweb.com'
    });
})

// Exportar modulo (fichero actual)
module.exports = app;