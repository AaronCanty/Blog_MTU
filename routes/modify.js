var express = require('express');
var modifyRouter = express.Router()

const mongoose = require('mongoose');
const blogs = require('../models/blogpost');

/* Make a GET request to the update / delete page. */
modifyRouter.get('/', function (req, res, next) {
  blogs.find()
    .then((blogfound) => {
      console.log(blogfound)
      //rendering the editPost.ejs file where you can edit or delete blog posts
      res.render('editPost', { 'bloglist': blogfound, title: 'Blogs' });
    }, (err) => next(err))
    .catch((err) => next(err));
});

// this is for the edit functionality
modifyRouter.get('/edit/:id', function (req, res, next) {
 // declaring blogID as the req.params.id so we can use our model.findByIdAndUpdate() function.
  blogID = req.params.id
  console.log(blogID)
  blogs.findByIdAndUpdate(blogID)
  //then, render the edit page
    .then(bloglist => {
      res.render('edit.ejs', { 'bloglist': bloglist, title: 'Blogs' })
    }, (err) => next(err))
});

// this is once we've made an edit. Editing is a POST request. 
// Routing to /edit/:id, where :id is the _id of each object
modifyRouter.route('/edit/:id')
  .post((req, res, next) => {
    //blogID is the id parameter
    //blogID, and blogpost are initialised as the req id and the req body, which
    //are both used as parameters in the findByIdAndUpdate() function
    blogID = req.params.id
    blogpost= req.body
    blogs.findByIdAndUpdate(blogID, blogpost)
      .then((blogEdited) => {
        blogs.find()
          .then((bloglist) => {
            res.render('editPost', { 'bloglist': bloglist, title: 'Blogs' });
          }, (err) => next(err))
          .catch((err) => next(err));
      }, (err) => next(err))
      .catch((err) => next(err));
  });

  // this is for the delete function. It is a POST request.
  //
modifyRouter.post('/delete/:id', (req, res) => {
  //blogID as the req.params.id again
  //the findByIdAndDelete() function is called with blogID and blogpost/req.body as parameters
  var blogID = req.params.id;
  blogs.findByIdAndDelete(blogID, req.body)
    .then(blog => {
      blogs.find()
        .then(blogfound => {
          res.render('editPost', { 'bloglist': blogfound, title: 'Update/Delete Blogs' });
        }, (err) => next(err))
      }, (err) => next(err))
});


module.exports = modifyRouter;