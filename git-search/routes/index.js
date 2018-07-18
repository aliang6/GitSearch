const express = require('express');
const request = require('request');

const router = express.Router();

function checkError(err) {
  if (err) { console.log(err) };
}

// Variables for the form inputs
var input = "";
var selectedLanguage = "";

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

// POST Results
router.post('/results', (req, res) => {
  console.log(req.body);
  input = req.body.input;
  if(req.body.lang !== null){
    selectedLanguage = req.body.lang;
  }
  console.log(selectedLanguage);
  res.redirect('/results');
});

// GET Results
router.get('/results', (req, res) => {
  const link = 'https://api.github.com/search/repositories?q=open source ' + input + '+language:' + selectedLanguage + "&sort=stars&order=desc&is:public";
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
    //console.log(body);
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
    res.render('result', { body, link, total_count });
  });
});

module.exports = router;
