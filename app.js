/* throws some JS silent errors
fixes mistakes to improve JS optimization
prohobits syntax likely to be defined in future versions of ECMAScript */
'use strict'
// Node.js framework with HTTP utility methods & middleware
const express = require('express');
const app = express();
// server can accept argument specifiying a custom port (e.g. for heroku)
const port = process.env.PORT || 3000;
// utilities for working with file & directory paths
const path = require ('path');
// parse incoming request bodies under req.body property
const bodyParser = require('body-parser');
// file I/O reading & writing synchronously & asynchronously
const fs = require ('fs');
// seeded random number generator for JS
const seedrandom = require('seedrandom');
// bypass CORS security
const cors = require('cors');

let pickAPart = function(answer, name){
  let part;
  if (answer <= 2.5) {
    part = fs.readFileSync(__dirname + `/public/images/${name}1.svg`, 'UTF-8');
  } else if ((answer > 2.5) && (answer <= 5)) {
    part = fs.readFileSync(__dirname + `/public/images/${name}2.svg`, 'UTF-8');
  } else if ((answer > 5) && (answer <= 7.5)) {
    part = fs.readFileSync(__dirname + `/public/images/${name}3.svg`, 'UTF-8');
  } else {
    part = fs.readFileSync(__dirname + `/public/images/${name}4.svg`, 'UTF-8');
  }
  return part;
}

// bypass CORS security issues
app.use(cors());

// serves static files from public directory
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
// parses urlencoded UTF-8 encoded body
app.use(bodyParser.urlencoded({
  extended: false // parsing with querystring library instead of true (qs library)
}));

// run routes defined in routes/route file
// app.use(route);

// hello world
app.get('/', function(req, res) {
  console.log('here');
  res.end('here');
});

// creature generator
app.get('/creature/:seed', function(req, res) {
  let seed = req.params.seed;
  console.log(seed, 'seed');
  // trying out seed random
  var rng = seedrandom(seed);
  var sng = seedrandom(seed + ' ');
  var tng = seedrandom(seed + '  ');
  let answer1 = (rng()*10).toFixed(1);
  let answer2 = (sng()*10).toFixed(1);
  let answer3 = (tng()*10).toFixed(1);

  let header = fs.readFileSync(__dirname + '/public/images/header.svg', 'UTF-8');
  let footer = fs.readFileSync(__dirname + '/public/images/footer.svg', 'UTF-8');
  let bodyName = 'body';
  let eyesName = 'eyes';
  let mouthName = 'mouth';

  let body = pickAPart(answer1, bodyName);
  let eyes = pickAPart(answer2, eyesName);
  let mouth = pickAPart(answer3, mouthName);
  let creature = header + body + eyes + mouth + footer;
  fs.writeFileSync(__dirname + '/public/images/creature_sample.svg', creature);
  // res.writeHead(200, {'Content-Type': 'image/svg+xml' });
  console.log(creature, 'got here');
  res.send(creature);
});

/* problem:
 link svgs to frogger game from API
 image not appearing w/hot link
 options:
 - try saving sent object (svg) to a file and link locally
    - update frogger to be a node app, include fs
 - try changing sent object to be a view, render html w/image in body
 -
*/


// if request hasn't been sent by end of app, send a 500 error and end the request
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end();
});

// listen on the given port
app.listen(port, function() {
  console.log('Listening on port', port);
});

// export app module -- necessary?
// module.exports = app
