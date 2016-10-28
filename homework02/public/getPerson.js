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
	var formData= {"id" : $("#id").val() }

	//process the form
	console.log('Ajax request issued...');
	$.ajax({
		type: "POST"; //set method type
		url: "/getPerson"; //url that is used
		contentType: 'application/json',
		data: JSON.stringify(formData), //the variable where data is stored and convert to JSON
		dataType: 'json', //type of data we want
		
	})

	//if request completed
	.done(function(json_string) {
		json = JSON.parse(json_string);
		//append the new information
		$("body").append("<p>" + json.firstName +
			json.lastName + json.ID + json.year + "</p>");
		console.log('Request complete');
	});

	//if request failed
	.fail(function(xhr, status, errorThrown) {
		//let user know if failed
		console.log('Ajax request failed');
		alert('Ajac request failed');
	})
	}




