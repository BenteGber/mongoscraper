
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const checkSource = require('../helpers/validate');

const ArticleSchema = new Schema({

  title: {
    type: String,
    trim: true,
    unique: true,
    required: 'String is Required',
  },
  
  link: {
    type: String,
    unique: true,
    required: true,
  },

  source: {
    type: String,
    required: true,
    validate: [
      input => checkSource.sources.includes(input),
      'Unrecognized Source',
    ],
  },
  comments: {
    type: Array,
  },

});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
