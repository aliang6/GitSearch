const express = require('express');
const request = require('request');

const router = express.Router();

function checkError(err) {
  if (err) { console.log(err) };
}

// Variables for the form inputs
var input = "";
var selectedLanguage = "";
var selectedLicense = "";

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'GitSearch' });
});

// POST Results
router.post('/result', (req, res) => {
  console.log(req.body);
  input = req.body.input;
  if(req.body.lang && req.body.lang !== null) {
    console.log("Hi1");
    selectedLanguage = req.body.lang;
  }
  if(req.body.license && req.body.license !== null) {
    console.log("hi2");
    selectedLicense = req.body.license;
  }
  console.log(selectedLanguage);
<<<<<<< HEAD
  console.log(selectedLicense);
  res.redirect('/results');
});

// GET Results
router.get('/results', (req, res) => {
  const link = 'https://api.github.com/search/repositories?q=open source ' + input + '+language:' + selectedLanguage + '+license:' + selectedLicense + "&sort=stars&order=desc&is:public";
=======
  res.redirect('/result');
});

// GET Results
router.get('/result', (req, res) => {
  const link = 'https://api.github.com/search/repositories?q=open source ' + input + '+language:' + selectedLanguage + "&sort=stars&order=desc&is:public";
>>>>>>> e518d304f13461fcc90789e2a3d9eea599739e13
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
