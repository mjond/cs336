/*

mjd5 Mark Davis
Calvin College, CS336, LAB06
October 12, 2016


------Exercise 6.1-------
a) 
   Successful commands:
   curl -X POST http://localhost:3000/request -d '{"MARK":"50"}' -H 'Content-Type: application/json'
   curl -X PUT http://localhost:3000/request -d '{"MARK":"50"}' -H 'Content-Type: application/json'
   curl -X DELETE http://localhost:3000/request -d '{"MARK":"50"}' -H 'Content-Type: application/json'
   curl [--head] http://localhost:3000/request
   curl [--get] http://localhost:3000/request
   In chrome, the default method is GET


b) The most appropriate response code for undefined pages is 404


------Exercise 6.2-------
a)
   HTTP methods GET and POST support forms

b)
   The form is being passed back in JSON format. Data is not modified. The form data is stored 3 key value items embodied in the HTTP request.
*/
var express = require('express');
var app = express();
var HttpStatus = require('http-status-codes');
var parser = require('body-parser');
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(express.static("public"));

//default message
app.get('/', function (req, res) {
  res.send('Hello World -  default message');
});


//Five different HTTP methods
app.get('/request', function (req, res) {
  res.send('Got a GET request!');
});

app.post('/request', function (req, res) {
  res.send('Got a POST request' + req.body.MARK);
});

app.put('/request', function (req, res) {
  res.send('Got a PUT request' + req.body.MARK);
});

app.delete('/request', function (req, res) {
  res.send('Got a DELETE request' + req.body.MARK);
});

app.head('/request', function (req, res) {
  res.send('Got a HEAD request');
});



//method for taking care of exercise 6.2
app.post('/forms', function (req, res) {
  res.send('Hello, form POST!' + '<br> NAME: ' + req.body.user_name + '<br> EMAIL: ' + req.body.user_mail + '<br> MESSAGE : ' + req.body.user_message);
});





//bad request method
app.all('*', function(req, res) {
  res.send(HttpStatus.BAD_REQUEST);
});

//Specify which port to listen on
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
