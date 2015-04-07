// Hey

function apiSignup() {
	var data = $('#signupMainForm').serializeObject();
	$.ajax({
		type: "POST",
		url: "/api/signup",
		data: data,
		success: function(res, err) {
			console.log(res);
			console.log(err);
		},
		dataType: "JSON"
	});
}

console.log('apiHandler.js ready.');