'use strict'

var express = require('express');
var ArticleController = require('../controllers/articles');

var router = express.Router();

// Articles' routes
router.post('/article', ArticleController.createArticle);
router.get('/articles/:limit?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.updateArticle);
router.delete('/article/:id', ArticleController.deleteArticle);

module.exports = router;