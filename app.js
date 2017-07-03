/* throws some JS silent errors
fixes mistakes to improve JS optimization
prohobits syntax likely to be defined in future versions of ECMAScript */
'use strict'
// Node.js framework with HTTP utility methods & middleware
const express = require('express');
const app = express();
// server can accept argument specifiying a custom port (e.g. for heroku)
const port = process.env.PORT || 3000;
// organize routes into multiple files
const routes = require('route');
// utilities for working with file & directory paths
const path = require ('path');
// parse incoming request bodies under req.body property
const bodyParser = require('body-parser');
// file I/O reading & writing synchronously & asynchronously
const fs = require ('fs');
// seeded random number generator for JS
const seedrandom = require('seedrandom');



/*
get monster/:id
  // generate file based on seed
  // number 1-9, letters a-z undercase, letters a-z uppercase, spaces, punctuation, length
  first letter, length, last letter >> math.random

  take seed, use to pick a body, eyes, and mouth
  read body, eyes, mouth
  compile body, eyes, mouth into one file
  return compiled file
  test monster/:id route
*/

// trying out seed random
var rng = seedrandom('asfdf');
var sng = seedrandom('Aasdf ');
var tng = seedrandom('Aasdf  ');
let answer1 = (rng()*10).toFixed(1);
let answer2 = (sng()*10).toFixed(1);
let answer3 = (tng()*10).toFixed(1);
// var ddklj = seedrandom(answer2);
// console.log((ddklj()*10).toFixed(2));
console.log(answer1, answer2, answer3);

let header = fs.readFileSync(__dirname + '/public/images/header.svg', 'UTF-8');
let footer = fs.readFileSync(__dirname + '/public/images/footer.svg', 'UTF-8');
// let body
// let eyes
// let mouth
let bodyName = 'body';
let eyesName = 'eyes';
let mouthName = 'mouth';

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

let body = pickAPart(answer1, bodyName);
let eyes = pickAPart(answer2, eyesName);
let mouth = pickAPart(answer3, mouthName);
let creature = header + body + eyes + mouth + footer;
fs.writeFileSync(__dirname + '/public/images/creature_sample.svg', creature)
// console.log(body, 'after');


// use seed random on answer of previous. reliable, random?

// 3 options
// 0? 1 2 3 4 5 6 7 8 9 10


//header
//body
//eyes
//mouth
//footer

// serves static files from public directory
app.use(express.static(__dirname + '/public'));

// var svg = fs.readFileSync(__dirname + '/public/images/body2.svg', 'UTF-8');
// var eyes = fs.readFileSync(__dirname + '/public/images/eyes2.svg', 'UTF-8');
// let combo = svg + eyes;
// fs.writeFileSync(__dirname + '/public/images/combo_sample.svg', combo)
// console.log(svg, 'svg');
// console.log(eyes, 'eyes');
// console.log(combo, 'combo');
// set body-parser to parse JSON
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
