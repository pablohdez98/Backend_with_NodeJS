'use strict'

var mongoose = require('mongoose')
var app = require('./app');
var port = 5000;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('The connection to mongodb was successful');

        app.listen(port, () => {
            console.log('Server running on http://localhost:' + port)
        })
})