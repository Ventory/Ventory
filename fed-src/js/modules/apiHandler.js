// Hey

function apiSignup() {
	var data = $('#signupMainForm').serializeObject();
	$.ajax({
		type: "POST",
		url: "/api/signup",
		data: JSON.stringify(data),
		success: function(res, status) {
			console.log(res);
			console.log(status);
		},
		dataType: "json"
	});
}

console.log('apiHandler.js ready.');