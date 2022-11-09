const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var blogSchema = new Schema({
    blogtitle: {
        type: String,
        required: true,
    },
    blogentry: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

blogSchema.index({blogtitle: 'text', blogentry: 'text'});

var blogs = mongoose.model('Blog', blogSchema);

module.exports = blogs;