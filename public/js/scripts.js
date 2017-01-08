var category = ["people", "interests", "skills", "richest"];

// handler
$(document).ready(function() {
	getData();
});

// get people data from api
function getData() {
	console.log("getData function fired.."); // [debug]
	var peopleData = [];
	var request;

	// iterate through each api get function
	category.forEach(function(c){
		var params;

		// setup parameters to prepare for ajax calls
		if (c == category[1] || c == category[2]) params = "personIds=1,2,3"; // if interests or skills
		else params = ""; // must be richest or people
		
		// ajax calls
		request = $.ajax({
			url: "/" + c,
			dataType: "json",
			data: params
		});
		$.when(request).then(function(data) {
			// add each object to people data array
			if (c != "richest") data.unshift(c); // add group name to top of object array
			peopleData.push(data); // add to array of people data
			console.log(data); // [debug]
		}).done(function() {
			// if peopleData array same length as category array, all data ready
			if (peopleData.length == category.length) printDataInTable(peopleData);
		}).fail(function(){
			alert("Could not fetch the data.");
		});
	});
}

// print people data in html table
function printDataInTable(peopleData) {
	console.log("printDataInTable function fired.."); // [debug]
	var table = document.getElementById("peopleTable");
	var numRows;
	var rows;
	var tableIndex;

	// count number of people for rows to create
	$.each(peopleData, function (key, val){
		if (val[0] == "people") {
			numRows = val.length - 1; // count people minus category name
			return false;
		}
	});

	// create rows and cells
	for (i = 1; i <= numRows; i++) {
		var tIndex;
		rows = table.insertRow(i);
		tIndex = [{Name: rows.insertCell(0)},
			{Company: rows.insertCell(1)},
			{Skills: rows.insertCell(2)},
			{Interests: rows.insertCell(3)}];
		// test cells
		$.each(peopleData, function (key, val){
			if (val[0] == "people") {
				tIndex[0].Name.innerHTML = val[i].name;
				return false;
			}
		});
	}
	
	// for each object in peopleData array find which group and append to table
	peopleData.forEach(function (g){
		// if group array
		if (g[0]) { // if an array
			console.log("category is "+g[0]+".."); // [debug]
			// figure out which column by first array value
			// for each person object, print their category values
			// 
		}
		else if ("richestPerson" in g) { // must be richest person ref
			console.log("richest person.."); // [debug]
			// select the correct row by id and bold it
			//
		}
	});
}