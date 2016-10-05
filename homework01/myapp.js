/*
author: Mark Davis mjd85
course: CS336 Vander Linden Fall 2016
assignment: homework01
date: October 4, 2016
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

//                     *********** start server **************
var express = require('express');
var app = express();

//open port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//default message if no routes given
app.get('/', function (req, res) {
  res.send('Hello World!');
});

//function to take care of '/people' route
app.get('/people', function (req,res) {
	res.json(list);
});

//function to take care of '/people/id' route
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

app.get('/person/:ID/years', function (req, res) {
    var idp = req.params.ID;
    for (var i = 0; i < list.length; i++) {
        if(list[i].id == idp) {
			var start = list[i].startDate;
			var years = Age(start)
            res.json(list[i].firstName + " has worked " + years + " years");
            return;
        }
    }
    res.sendStatus(404);
});
