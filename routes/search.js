var express = require('express');
var searchRouter = express.Router()

const mongoose = require('mongoose');
const blogs = require('../models/blogpost');

// searchRouter to find strings in the blog

searchRouter.post('/', function (req, res, next) {
    console.log("posting");
    //it is searching both the titles and the entries
    blogSearch = req.body.search
    //regex - the model 'blogs' is finding text strings from the req.body.search
    blogs.find({ $text: { $search: blogSearch } })
        .then((blogfound) => {
            res.render('searchResults', { 'bloglist': blogfound, title: 'Blog Search Results' });
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = searchRouter;
