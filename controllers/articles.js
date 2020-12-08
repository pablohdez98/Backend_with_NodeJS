 'use strict'

 var validator = require('validator');
 var Article = require('../models/article');

 var controller = {

    createArticle: (req, res) => {
        var params = req.body;

        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch(err) {
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
        } catch(err) {
            return res.status(200).send({
                status: 'error',
                message: 'Missing data to send'
            });
        }

        if (validate_title && validate_content) {
            Article.findByIdAndUpdate(articleId, params, {new:true}, (err, articleUpdated) => {
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
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error when deleting the article'
                });
            }

            if(!articleRemoved){
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
    }
 };

 module.exports = controller;