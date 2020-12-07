 'use strict'

 var controller = {

     pruebaGet: (req, res) => {
         return res.status(200).send({
             curso: 'Master en Udemy',
             autor: 'Pablo Hernández',
             url: 'pablohernandezweb.com',
         });
     },

     pruebaPost: (req, res) => {
         var test = req.body.test;
        return res.status(200).send({
            test
        });
    }

 };

 module.exports = controller;