'use strict'

var express = require('express');
var ArticleController = require('../controllers/articles');

var router = express.Router();

router.get('/prueba', ArticleController.pruebaGet);
router.post('/prueba', ArticleController.pruebaPost);

module.exports = router;