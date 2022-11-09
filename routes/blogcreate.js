var express = require('express');
var blogcreateRouter = express.Router();
// connecting the schema with the router
const mongoose = require('mongoose');
const blogs = require('../models/blogpost');

// getting the blog create page
blogcreateRouter.get('/', function (req, res, next) {
  res.render('blogcreate', { title: 'Add a blog' });

});

// using the blogcreateRouter to post a blog
blogcreateRouter.route('/')
  .post((req, res, next) => {
    //blogs.create
    blogs.create(req.body)
      .then(() => {
        console.log("Blog has been successfully created");
        // find the blogs
        blogs.find()
          .then((blogfound) => {
            //render the index page after the blog post is created, 
            // with the list of blogs with the page title 'Blogs'
            res.render('blogIndex', { 'bloglist': blogfound, title: 'Blogs' });
          }, (err) => next(err))
          .catch((err) => next(err));
      }, (err) => next(err))
      .catch((err) => next(err));
  });


module.exports = blogcreateRouter;