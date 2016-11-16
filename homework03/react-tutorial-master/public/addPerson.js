/*
Calvin College, CS336, homework 2
Mark Davis mjd85
Fall 2016
*/

"use strict";

$('form').submit(function(event) {

	//stop form from submitting the normal way and refreshing the page
	event.preventDefault();

	var form = $( this );
	
	//get form data and save in variable
	var formData= {
		'firstName' : $("#firstName").val(),
		'lastName'  : $("#lastName").val(),
		'id'        : $("#id").val(),
		'startDate' : $("#year").val()
	}

	//process the form
	console.log('Ajax request issued...');
	$.ajax({
		url: "/addPerson"; //url that is used
		type: "POST"; //set method type
		data: JSON.stringify(data), //the variable where data is stored
		dataType: 'json', //type of data we want
	})

	//if request completed
	.done(function(json_string) {
		//add new information
		json = JSON.parse(json_string);
		$("body").append("<p>" + json.firstName +
			json.lastName + json.ID + json.year + "</p>");
		console.log('Request complete');
	});

	//if request failed then send error
	.fail(function(xhr, status, errorThrown) {
		//let user know the request failed
		console.log('Ajax request failed');
		alert('Ajax request failed');
	})
}