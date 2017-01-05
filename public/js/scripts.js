// handler
document.body.onload = function(){
	getData();
	printDataInTable();
};

// get json data from api
function getData() {
	console.log("getData function fired!"); // [debug]
	var page = ["people", "interests", "skills", "richest"];
	var groupData = [];

	// setup parameters to prepare for ajax calls
	page.forEach(function(p){
		var params;
		switch(p) {
			case "interests":
				params = "personIds=1,2,3";
				break;
			case "skills":
				params = "personIds=1,2,3";
				break;
			default:
				params = "";
				break;
		}
		// ajax calls
		var request = $.ajax({
			url: "/" + p,
			dataType: "json",
			data: params
		});
		request.done(function(data) {
			// add each object to people data array
			if (p != "richest") data.unshift(p); // add group name to top of object array
			groupData.push(data); // add to array of groups 
			console.log(data); // [debug]
		});
	});
}

// print data in html table
function printDataInTable() {
	console.log("printDataInTable function fired!"); // [debug]
}