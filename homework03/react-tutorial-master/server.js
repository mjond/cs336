/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

 //function to make Person type
function person(firstName, lastName, id, startDate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.startDate = startDate;
    this.getFirstName = function() {
        return this.firstName;
    }
    this.getid = function() {
        return this.id;
    }
    this.getYear = function() {
        return this.year;
    }
    this.getLastName = function() {
        return this.lastName;
    }
}

//array to store the people with their parameters
var list = [];
list.push(new person("john", "davidson", "jjj77", "2014/11/02"));
list.push(new person("henry", "johnson", "hhh99", "2008/02/03"));
list.push(new person("chuck", "henry", "bbb55", "2005/12/12"));
list.push(new person("bob", "Last name", "ttt33", "1996/02/04"));

//function to compute age with the company
function Age(givenDate) {
    var today = new Date();
    var startDay = new Date(givenDate);
    var oldness = today.getFullYear() - startDay.getFullYear();
    var month = today.getMonth() - startDay.getMonth();
    if (month < 0 || (month == 0 && today.getDate() < startDay.getDate())) {
        oldness--;
    }
    return oldness;
}

//               *********** start server **************

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var db;
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static('public'));
app.use('/', express.static(path.join(__dirname, 'dist/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});



//######## HOMEWORK 2 FUNCTIONS ###############



//function to list all people with GET
app.get('/people', function (req,res) {
    res.json(list);
});


//function to find a person with a given id using GET
app.get('/person/:ID', function (req, res) {
    var idp = req.params.ID;
    for (var i = 0; i < list.length; i++){
        if(list[i].id == idp) {
            res.json(list[i]);
            return;
        }
    }
    res.sendStatus(404 + " 404");
});

//function to delete existing person with DELETE
app.delete('/person/:ID', function (req, res) {
    var idp = req.params.ID;
    for (var i = 0; i < list.length; i++){
        if(list[i].id == idp) {
            //delete user 
            index = list.indexOf(person);
            list.splice(index, 1);
            res.send(person.firstName + " " + person.lastName + " is removed");
        }
    }
    res.sendStatus(404 + " 404");
});

//function to modify existing person with PUT
app.put('/person/:ID', function (req, res) {
    var idp = req.params["ID"];
    for (var i = 0; i < list.length; i++){
        if(list[i].id == idp) {
            i.firstName = req.body.firstName;
            i.lastName = req.body.lastName;
            i.id = req.body.id;
            i.startdate = req.body.startDate;
            res.send("User is updated");
        }
    }
    res.sendStatus(404 + " 404");
});


//function to take care of '/people/id/name' route
app.get('/person/:ID/name', function(req, res) {
    var idp = req.params.ID;
    for (var i = 0; i < list.length; i++) {
        if(list[i].id == idp) {
            res.json(list[i].firstName + " " + list[i].lastName);
            return;
        }
    }
    res.sendStatus(404);
});

//function to take care of '/people/id/years' route
app.get('/person/:ID/years', function (req, res) {
    var idp = req.params.ID;
    for (var i = 0; i < list.length; i++) {
        if(list[i].id == idp) {
            var start = list[i].startDate;
            var years = Age(start)
            //get values in json form
            res.json(list[i].firstName + " has worked " + years + " years");
            return;
        }
    }
    res.sendStatus(404);
});

//function to take care of adding a person using /addPerson
app.post('/addPerson', function(req, res) {
    list.push(new person(req.body.firstName, req.body.lastName, req.body.id, req.body.year));
    resData = {"first": req.body.firstName, 
               "last": req.body.lastName};
    res.json(JSON.stringifty(resData));
});

//function to take care of finding a person using /getPerson
app.post('/getPerson', function(req, res) {
    //var id_form = req.body.id;
    for (var i = 0; i < list.length; i++) {
        if(list[i].id == ID) {
            resData = {"first": i["firstName"], 
                        "last": i["lastName"], 
                        "id": i["id"], 
                        "date": i["startDate"]};
            res.json(JSON.stringify(resData));
        }
    }
});



//######## HOMEWORK 3 FUNCTIONS ############### below this line


app.get('/api/comments', function(req, res) {
    db.collection("hw3").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});



app.post('/api/comments', function(req, res) {
    var newComment = {
        id: Date.now(),
        author: req.body.author,
    };
    db.collection("hw3").insertOne(newComment, function(err, result) {
        if (err) throw err;
        db.collection("hw3").find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });
});



var mongoURL = 'mongodb://user1:bjarne@ds043022.mlab.com:43022/mdavis';
MongoClient.connect(mongoURL, function(err, dbConnection) {
     if (err) throw err;
     db = dbConnection;
 });


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
