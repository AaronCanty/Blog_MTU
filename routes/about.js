var express = require('express');
var aboutRouter = express.Router();

/* Make a GET request to the about page. */
aboutRouter.get('/', function (req, res, next) {
  res.render('about.ejs', { title: 'About Me' })

});


module.exports = aboutRouter;