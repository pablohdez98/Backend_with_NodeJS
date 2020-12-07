'use strict'

// Cargar módulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar express (http)
var app = express();

// Cargar ficheros rutas
var articleRoutes = require('./routes/articles');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// Añadir prefijos a rutas
app.use('/api', articleRoutes);

// Exportar modulo (fichero actual)
module.exports = app;