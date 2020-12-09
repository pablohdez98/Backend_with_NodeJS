'use strict'

var express = require('express');
var ArticleController = require('../controllers/articles');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/articles' });

// Articles' routes
router.post('/article', ArticleController.createArticle);
router.get('/articles/:limit?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.updateArticle);
router.delete('/article/:id', ArticleController.deleteArticle);
router.post('/upload-image/:id', md_upload, ArticleController.upload);
router.get('/get-image/:image', ArticleController.getImage);

module.exports = router;