const express = require('express');
const request = require('request');

const router = express.Router();

function checkError(err) {
  if (err) { console.log(err) };
}

// Variables from the form inputs
var link ='https://api.github.com/search/repositories?q="open source'

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'GitSearch' });
});

// POST Results
router.post('/results', (req, res) => { // Configure the link then redirect to GET /result
  const input = req.body.input;
  if(input != ''){
    link += ' ' + input;
  }
  link += '"+';
  if(typeof req.body.lang !== 'undefined' && req.body.lang !== null) {
    console.log("Hi1");
    link += 'language:' + req.body.lang + '+';
  }
  if(typeof req.body.license !== 'undefined' && req.body.license !== null) {
    console.log("hi2");
    link += 'license:' + req.body.license + '+';
  }
  link += '&sort=stars&order=desc&is:public&';
  res.redirect('/result');
});

// GET Results
router.get('/result', (req, res) => { 
  console.log(link);
  const options = { // Setup JSON for the request
    url: link,
    method: 'GET',
    headers: {
      'User-Agent': '',
    }
  };

  request.get(options, (err, response, body) => { // Request to GitHub's API
    checkError(err);
    body = JSON.parse(body);
    // Format dates and time for created and updated
    for (let item of body.items) {
      let tmp = item.created_at.substring(0, 10);
      tmp += ' ' + item.created_at.substring(11, 19);
      item.created_at = tmp;
      tmp = item.updated_at.substring(0, 10);
      tmp += ' ' + item.updated_at.substring(11, 19);
      item.updated_at = tmp;
      if(item.license === null) {
        item.license = { name: 'No License', };
      }
      if(item.language === null) {
        item.language = 'No Language';
      }
    }
    const total_count = body.total_count;
    link = 'https://api.github.com/search/repositories?q="open source';
    res.render('result', { body, link, total_count });
  });
});

module.exports = router;
