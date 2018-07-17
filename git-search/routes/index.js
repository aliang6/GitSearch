const express = require('express');
const request = require('request');

const router = express.Router();

function checkError(err) {
  if (err) { console.log(err) };
}

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// POST Results
router.post('/results', (req, res) => {

});

// GET Results
router.get('/results', (req, res) => {
  const search = 'tetris';
  const language = 'assembly';
  const options = {
    url: 'https://api.github.com/search/repositories?q=' + search + '+language:' + language + "&sort=stars&order=desc",
    method: 'GET',
    headers: {
      'User-Agent': 'aliang6',
    }
  };

  /* const option = {
    url: 'https://api.github.com/search/repositories?q=' + search + '+language:' + language + '&' + 'topic:open source',
    method: 'GET',
    headers: {
      'User-Agent': 'aliang6',
    }
  } */

  request.get(options, (err, response, body) => {
    checkError(err);
    body = JSON.parse(body);
    console.log(body);
    const total_count = body.total_count;
    res.render('result', { body });
  });
});

module.exports = router;
