'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Article = require('../models/article');

var controller = {

    createArticle: (req, res) => {
        var params = req.body;

        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Missing data to send'
            });
        }

        if (validate_title && validate_content) {
            var article = new Article();

            article.title = params.title;
            article.content = params.content;
            article.image = null;

            article.save((err, articleStored) => {
                if (err || !articleStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'The article has not been saved'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });
            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'The data is not valid'
            });
        }
    },

    getArticles: (req, res) => {

        var query = Article.find({});
        var limit = req.params.limit;

        if (limit || limit != undefined) {
            query.limit(Number(limit));
        }

        query.sort('-_id').exec((err, articles) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Could not get the articles'
                });
            }

            if (!articles) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No articles found'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });
        })
    },

    getArticle: (req, res) => {
        var articleId = req.params.id;

        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'The article does not exist'
            });
        }

        Article.findById(articleId, (err, article) => {
            if (err || !article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Could not get the article'
                });
            }

            return res.status(200).send({
                status: 'success',
                article
            });
        });
    },

    updateArticle: (req, res) => {
        var articleId = req.params.id;
        var params = req.body;

        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Missing data to send'
            });
        }

        if (validate_title && validate_content) {
            Article.findByIdAndUpdate(articleId, params, {
                new: true
            }, (err, articleUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Could not update the article'
                    });
                }

                if (!articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'The article does not exist'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'The data is not valid'
            });
        }
    },

    deleteArticle: (req, res) => {
        var articleId = req.params.id;

        Article.findByIdAndDelete(articleId, (err, articleRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error while deleting the article'
                });
            }

            if (!articleRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Could not delete the article'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        })
    },

    upload: (req, res) => {
        var file_name = 'Imagen no subida...';

        if (!req.files) {
            return res.status(404).send({
                status: 'error',
                message: 'Image not uploaded'
            });
        }

        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[file_split.length - 1];
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif') {
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'Image extension not valid'
                });
            });
        } else {
            var articleId = req.params.id;

            Article.findByIdAndUpdate(articleId, {image: file_name}, {new:true}, (err, articleUpdated) => {
                if (err || !articleUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Error while uploading the image'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            });
        }
    },

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/articles/' + file;

        fs.stat(path_file, (err) => {
            if (err) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Image does not exist'
                });
            }
            return res.sendFile(path.resolve(path_file));
        })
    }
};

module.exports = controller;