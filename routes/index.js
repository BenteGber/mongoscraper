const express = require('express');

const router = express.Router();

const scrape = require('./scrape');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongoscraper', { useNewUrlParser: true });

const Article = require('../models/article');
/* GET home page. */
router.get('/', (req, res, next) => {
  scrape.getGreentech();
  res.redirect('/articles');
});

router.get('/articles', (req, res, next) => {
  Article.find({})
    .then((articles) => {
      res.render('index', articles);
    })
    .catch((err) => res.render('error', err));
});

router.post('/addcomment/:id', (req, res, next) => {
  Article.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comments: req.body.comment },
    },
    (err, data) => {
      if (err)
        return res.status(401).json({ message: 'failed to add comment' });
      res.json({ message: 'Comment added succesfully', data });
    },
  );
});
module.exports = router;
