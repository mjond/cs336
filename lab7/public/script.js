/*
lab7 CS336 Calvin college
Mark Davis mjd85
October 18, 2016
*/

//document ready
$( document ).ready(function() {

	//code to run when button is clicked
	$("#button").click( function( event ){
		$.ajax({
			url: "/hello",
			data: {
				name: "lab07"
			},
			type: "GET"
		})

		//code to run if request succeeds
		.done(function(json_string){
			const json = JSON.parse(json_string);
			$("body").append("<p>" + json.message + "</p>");
			console.log('Request complete')	
		})

		//code to run if request failed
		.fail(function(xhr, status, errorThrown) {
			console.log("Ajax request failed");
			alert("ajax request failed");
		})
	})
});

	