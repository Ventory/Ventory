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
		}
	});
}

console.log('apiHandler.js ready.');