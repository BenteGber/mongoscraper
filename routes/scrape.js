const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongoscraper', { useNewUrlParser: true });

const cheerio = require('cheerio');
const axios = require('axios');
const Article = require('../models/article');

const getGreentech = () => {
  // TODO refactor title parsing to include title text.
  axios.get('https://www.greentechmedia.com').then((response) => {
    const $ = cheerio.load(response.data);

    const results = [];

    $('div.copy-holder').each((i, element) => {
      const title = $(element)
        .children()
        .find('h1')
        .text()
        .trim();

      let link = $(element)
        .parent()
        .find('a')
        .attr('href');

      const rootUrl = 'https://www.greentechmedia.com';

      link = rootUrl + link;

      results.push({
        title,
        link,
        source: rootUrl,
      });

      results.forEach((el) =>
        Article.create(el)
          .then(console.log('data added'))
          .catch((err) => console.log(err)),
      );
    });
  });
};

const getUtilityDive = (cb) => {
  axios.get('https://www.utilitydive.com/').then((response) => {
    const $ = cheerio.load(response.data);

    const results = [];

    $('h3.feed__title.feed__title--display').each((i, element) => {
      const title = $(element)
        .children()
        .text()
        .trim();

      let link = $(element)
        .find('a')
        .attr('href');

      const rootUrl = 'https://www.utilitydive.com/';

      link = rootUrl + link;

      // TODO add code to push results into DB
      results.push({
        title,
        link,
      });
      // results.forEach(el => cb(el));
    });
    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
  });
};

module.exports = {
  getGreentech,
  getUtilityDive,
};
