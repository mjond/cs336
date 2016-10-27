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
		'firstName' : $('input[name=user_first]').val(),
		'lastName'  : $('input[name=user_last]').val(),
		'id'        : $('input[name=ID]').val(),
		'startDate' : $('input[name=user_year]').val()
	}

	//process the form
	console.log('Ajax request issued...');
	$.ajax({
		url: "/addPerson"; //url that is used
		type: "POST"; //set method type
		data: formData, //the variable where data is stored
		dataType: 'json', //type of data we want
		encode : true //convert to json format
	})

	//if request completed
	.done(function(json_string) {
		json = JSON.parse(json_string);
		$("body").append("<p>" + json.firstName +
			json.lastName + json.ID + json.year + "</p>");
		console.log('Request complete');
	});

	//if request failed
	.fail(function(xhr, status, errorThrown) {
		console.log('Ajax request failed');
		alert('Ajac request failed');
	})
}