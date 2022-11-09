var express = require('express');
var indexRouter = express.Router();

const mongoose = require('mongoose');
const blogs = require('../models/blogpost');

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  // find the blogs and then render the blog list (index) with the title of 'Index - Blogs"
  blogs.find()
  .then((blogfound) => {
         res.render('blogIndex',{'bloglist' : blogfound, title:'Index - Blogs'} );
 }, (err) => next(err))
.catch((err) => next(err));
});

module.exports = indexRouter;