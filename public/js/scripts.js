var page = ["people", "interests", "skills", "richest"];

// handler
document.body.onload = function(){
	var peopleInfo;
	peopleInfo = getData();
console.log("peopleInfo: "+peopleInfo); // [debug]
	printDataInTable(peopleInfo);
};

// get people data from api
function getData() {
console.log("getData function fired.."); // [debug]
	var groupData = [];

	// iterate through each group/api get function
	page.forEach(function(p){
		var params;
		var request;

		// setup parameters to prepare for ajax calls
		if (p == page[1] || p == page[2]) params = "personIds=1,2,3"; // if interests or skills
		else params = ""; // must be richest or people
		
		// ajax calls
		request = $.ajax({
			url: "/" + p,
			dataType: "json",
			data: params,
			async: false
		});
		request.done(function(data) {
			// add each object to people data array
			if (p != "richest") data.unshift(p); // add group name to top of object array
			groupData.push(data); // add to array of groups
console.log(data); // [debug]
		});
	});
	return groupData;
}

// print people data in html table
function printDataInTable(groups) {
console.log("printDataInTable function fired.."); // [debug]
	table = document.getElementById("peopleTable");
	// for each object in groups array find which group and append to table
	groups.forEach(function (g){
		// if group array
		if (g[0]) {
			switch(g[0]) {
				case page[0]: // people
console.log("people.."); // [debug]
					// table.insertRow(-1);
					break;
				case page[0]: // interests
console.log("interests.."); // [debug]
					// table.insertRow(-1);
					break;
				case page[0]: // skills
console.log("skills.."); // [debug]
					// table.insertRow(-1);
					break;
				default: // must be richest
console.log("default.."); // [debug]
					break;
			}
		}
	});
}