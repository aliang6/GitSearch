const express = require('express');
const request = require('request');

const router = express.Router();

function checkError(err) {
  if (err) { console.log(err) };
}

// Helper variables and variables from the form inputs
var link ='https://api.github.com/search/repositories?q="open source'
var total_pages = 0;
var prev_page = 0;
var next_page = 0;
var curr_page = 1;

// Helper function
function getTotalPages(link) { // Uses pagination links to get the total number of pages
  const index = link.lastIndexOf('page');
  total_pages = parseInt(link.substring(index + 5, link.length));
  console.log(total_pages);
  return total_pages;
}

/* GET home page. */
router.get('/', (req, res) => {
  link = 'https://api.github.com/search/repositories?q="open+source';
  res.render('index', { title: 'GitSearch' });
});

// POST Results
router.post('/results', (req, res) => { // Configure the link then redirect to GET /result
  const input = req.body.input;
  total_pages = 0;
  if(input != ''){
    link += ' ' + input;
  }
  link += '"+';
  console.log(req.body);
  if(typeof req.body.lang !== 'undefined' && req.body.lang !== null && req.body.lang !=='on') {
    console.log("Hi1");
    link += 'language:' + req.body.lang + '+';
  }
  if(typeof req.body.license !== 'undefined' && req.body.license !== null && req.body.license !== 'on') {
    console.log("hi2");
    link += 'license:' + req.body.license + '+';
  }
  link += '&sort=stars&order=desc&is:public&per_page=10&page=1';
  res.redirect('/results/page=1');
});

// POST Results Page
router.post('/results/page', (req, res) => { // Checks input and properly configures the link
  const desired_page = req.body.page;
  console.log(desired_page);
  if(isNaN(desired_page) || desired_page <= 0) { // Checks if input is an int
    curr_page = 1;
    res.redirect('/results/page=1');
  } else if (desired_page > total_pages) {
    curr_page = total_pages;
    res.redirect('/results/page=' + total_pages);
  }
  else {
    curr_page = desired_page;
    res.redirect('/results/page=' + desired_page);
  }
});

// GET Results
router.get('/results/page=:page', (req, res) => {
  const pageIndex = link.lastIndexOf('page'); 
  link = link.substring(0, pageIndex + 5);
  if(req.body.page){
    link += req.body.page;
    curr_page = req.body.page;
  } else {
    link += req.params.page;
    curr_page = req.params.page;
  }
  
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
    if(total_pages == 0 && response.headers.link){
      var first = response.headers.link;
      var pagination_arr = first.split(' ');
      console.log(pagination_arr);
      getTotalPages(pagination_arr[2]);
      console.log(total_pages);
    }
    body = JSON.parse(body);
    console.log(body);
    // Format dates and time for created and updated
    if(body.items && body.items[0]) {
      for (let item of body.items) {
        let tmp = item.created_at.substring(0, 10);
        tmp += ' ' + item.created_at.substring(11, 19);
        item.created_at = tmp;
        tmp = item.updated_at.substring(0, 10);
        tmp += ' ' + item.updated_at.substring(11, 19);
        item.updated_at = tmp;
        if(item.license === null) {
          item.license = { name: 'Unlicensed', };
        }
        if(item.language === null) {
          item.language = 'No Language';
        }
      }
    }
    
    prev_page = parseInt(curr_page) - 1;
    next_page = parseInt(curr_page) + 1;
    console.log('Prev page = ' + prev_page);
    console.log('Next page = ' + next_page);
    if(parseInt(next_page) > parseInt(total_pages)) { next_page = 0 }
    console.log(link);

    const total_count = body.total_count;
    res.render('result', { body, link, total_count, total_pages, curr_page, prev_page, next_page });
  });
});

module.exports = router;
