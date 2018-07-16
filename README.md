# GitSearch Design Document
Search GitHub for open source projects to contribute to using languages that you know.

## Audience
Developers who are looking for open source projects to contribute towards to improve the code and/or their individual skills. Other potential people who can use this website are developers who are looking for open source projects that they can use for their own projects.

## Experience
A user opens the webpage and is created with buttons that they can use to select comfortable languages. They are then able to input keywords into the search bar and click the search button to see all matching GitHub repositories.

# Technical
## Models
- Displayed Repositories (Name, Description, Link)

## Views
- Index/Home
- Result

## Routes
- Index/Home
  - GET <span></span>www.gitsearch.com/
- Result
  - GET <span></span>www.gitsearch.com/results?
  - POST <span></span>www.gitsearch.com/results?

## Features
- Search Bar for Keywords to Search
- Buttons and/or Dropdowns for Coding Languages
- Results Page with Matching Open Source Repositories

## Languages
#### Front-End
* HTML
* CSS
* Bootstrap
#### Back-End
* JavaScript
* Node.js
* Express.js
* GitHub's API

## Work Delegation
Alan Yu - Back End, Node.JS, and Routing
Lawrence Ng - Front End and Design
Andy Liang - Back End, Node.JS, and API

## Planning
- Monday July 16, 2018 
  - Design Document
  - Work Delegation
- Tuesday July 17, 2018
  - Routing Setup
  - GitHub API Setup
  - Front End Skeleton/Wireframe
- Wednesday July 18, 2018
  - Input to API Search
  - Results Display
  - Combining Front End and Back End
  - Complete MVP
- Thursday July 19, 2018
  - Completed Design and Functionality
  - User Testing
- Friday July 20, 2018
  - Polish using User Feedback
  - Fix Edge Cases
  - Demo
