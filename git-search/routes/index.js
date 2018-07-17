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
  const search = 'costco';
  const language = 'ruby';
  const link = 'https://api.github.com/search/repositories?q=' + search + '+language:' + language + "&sort=stars&order=desc";
  const options = {
    url: link,
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
    for (let item of body.items) {
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

    //console.log(body);
    const total_count = body.total_count;
    res.render('result', { body, link });
  });
});

module.exports = router;
