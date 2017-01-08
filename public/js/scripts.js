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
function printDataInTable(groups) {
	console.log("printDataInTable function fired.."); // [debug]
	table = document.getElementById("peopleTable");
	// for each object in groups array find which group and append to table
	groups.forEach(function (g){
		// if group array
		if (g[0]) { // if an array
			switch(g[0]) {
				case category[0]: // people
				console.log("people.."); // [debug]
					// table.insertRow(-1);
					break;
				case category[1]: // interests
				console.log("interests.."); // [debug]
					// table.insertRow(-1);
					break;
				case category[2]: // skills
				console.log("skills.."); // [debug]
					// table.insertRow(-1);
					break;
				default: // must be richest
				console.log("default.."); // [debug]
					break;
			}
		}
		else if ("richestPerson" in g) { // must be richest person ref
			console.log("richest person.."); // [debug]
		}
	});
}