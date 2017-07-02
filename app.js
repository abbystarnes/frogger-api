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

// serves static files from public directory
app.use(express.static(__dirname + '/public'));

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
