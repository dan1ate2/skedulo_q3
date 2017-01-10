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
	var richest;

	// count number of people for rows to create & get richest id
	$.each(peopleData, function (key, val){
		if (val.richestPerson) richest = val.richestPerson;
		if (val[0] == "people") {
			numRows = val.length - 1; // count people minus category name
		}
		// check if both rows and richest already found
		if (numRows && richest) {
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
		var b = { // bold for richest
			open: "<strong>",
			close: "</strong>"
		};
		
		// read each people data object and put into cells
		$.each(peopleData, function (key, val){
			var isRichest = false; // flag

			if (Array.isArray(val)) { // if not richestPerson object
				// check current data is for richest person
				if (val[i].id) { // person data
					isRichest = checkIfRichest(val[i].id, richest);
				}
				else if (val[i].personId) { // skills or interests data
// problem here where it returns true for wrong person					
					isRichest = checkIfRichest(val[i].personId, richest);
				}

				// set names and company in cells
				if (val[0] == "people") {
					// tIndex[0].Name.innerHTML = val[i].name;
					isRichest ? tIndex[0].Name.innerHTML = b.open+val[i].name+b.close 
						: tIndex[0].Name.innerHTML = val[i].name;
					isRichest ? tIndex[1].Company.innerHTML = b.open+val[i].org+b.close 
						: tIndex[1].Company.innerHTML = val[i].org;
				}
				// set skills in cells
				else if (val[0] == "skills") {
					var skills = "";
					var firstSkill = true; // flag

					// check id's to match skills to person
					for (j = 1; j < val.length; j++) { // first value
						if (val[j].personId == i && firstSkill) {
							skills += val[j].name;
							firstSkill = false;
						}
						else if (val[j].personId == i) { // all values after first
							skills += ", "+val[j].name;
						}
					}
					isRichest ? tIndex[2].Skills.innerHTML = b.open+skills+b.close 
						: tIndex[2].Skills.innerHTML = skills;
				}
				// set interests in cells
				else if(val[0] == "interests") {
					var interests = "";
					var firstInterest = true; // flag

					// check id's to match interests to person
					for (j = 1; j < val.length; j++) {
						if (val[j].personId == i && firstInterest) {
							interests += val[j].name; // first value
							firstInterest = false;
						}
						else if (val[j].personId == i) {
							interests += ", "+val[j].name; // all values after first
						}
					}
					isRichest ? tIndex[3].Interests.innerHTML = b.open+interests+b.close 
						: tIndex[3].Interests.innerHTML = interests;
				}
			}
		});
	}
}

// check if richest person
function checkIfRichest(id, richest) {
	return (id == richest) ? true : false
}