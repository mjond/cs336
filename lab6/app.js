var express = require('express');
var app = express();
var HttpStatus = require('http-status-codes');

//default message
app.get('/', function (req, res) {
  res.send('Hello World -  default message');
});


//Five different HTTP methods
app.get('/request', function (req, res) {
  res.send('Got a GET request!');
});

app.post('/request', function (req, res) {
  res.send('Got a POST request');
});

app.put('/request', function (req, res) {
  res.send('Got a PUT request');
});

app.delete('/request', function (req, res) {
  res.send('Got a DELETE request');
});

app.head('/request', function (req, res) {
  res.send('Got a HEAD request');
});

//bad request method
app.all('*', function(req, res) {
  res.send(HttpStatus.BAD_REQUEST);
});

//Specify which port to listen on
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});