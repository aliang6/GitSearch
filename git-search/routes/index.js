const express = require('express');
const request = require('request');

const router = express.Router();

function checkError(err) {
  if (err) { console.log(err) };
}

var input = "";

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'GitSearch' });
});

// POST Results
router.post('/result', (req, res) => {
  console.log(req.body);
  input = req.body.input;
  res.redirect('/result');
});

// GET Results
router.get('/result', (req, res) => {
  const language = '';
  const link = 'https://api.github.com/search/repositories?q=' + input + '+language:' + language + "&sort=stars&order=desc&is:public";
  const options = {
    url: link,
    method: 'GET',
    headers: {
      'User-Agent': 'aliang6',
    }
  };

  request.get(options, (err, response, body) => {
    checkError(err);
    body = JSON.parse(body);
    console.log(body);
    for (let item of body.items) {
      // Format dates and time for created and updated
      let tmp = item.created_at.substring(0, 10);
      tmp += ' ' + item.created_at.substring(11, 19);
      item.created_at = tmp;
      tmp = item.updated_at.substring(0, 10);
      tmp += ' ' + item.updated_at.substring(11, 19);
      item.updated_at = tmp;
      if(item.license === null){
        item.license = { name: 'No License', };
      }
    }
    const total_count = body.total_count;
    console.log(total_count);
    res.render('result', { body, link });
  });
});

module.exports = router;
