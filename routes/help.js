var express = require('express');
var helpRouter = express.Router();

/* Make a GET request to the help page */
helpRouter.get('/', function (req, res, next) {
    res.render('help.ejs', { title: 'Help!' });

});

module.exports = helpRouter;