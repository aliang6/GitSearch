const express = require('express');
const request = require('request');

const router = express.Router();

function checkError(err) {
  if (err) { console.log(err) };
}

/* GET home page. */
router.get('/', (req, res) => {
  const search = 'tetris';
  const langauge = 'assembly';
  const url = 'https://api.github.com/search/repositories?q=' + search + '+language=' + language + "&";

  request.get(url, (err, response, body) => {
    checkError(err);
    body = JSON.parse(body);
    console.log(body);
  });
  res.render('index', { title: 'Express' });
});

// POST Results
router.post('/results', (req, res) => {

});

// GET Results
router.get('/results', (req, res) => {

});

module.exports = router;
