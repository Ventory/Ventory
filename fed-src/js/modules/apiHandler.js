// Hey

function apiSignup() {
	$('#signupMainAlertContainer').html('');

	var data = $('#signupMainForm').serializeObject();

	$.ajax({
		type:"POST",
        beforeSend: function (request)
        {
            request.setRequestHeader("Content-Type", 'application/json');
        },
        data: JSON.stringify(data),
        processData: false,
		url: "/api/signup",
		success: function(res, status) {
			
			if (res.status == 0) {
				// Everything is fine

			};

			if (res.status == 1) {
				// Something isn't fine
				for (var i = res.errors.length - 1; i >= 0; i--) {
					$('<div/>', { class: 'alert alert-danger'}).text(res.errors[i].msg).appendTo('#signupMainAlertContainer');

					$('#signupMainForm input[' + res.errors[i].field + ']').addClass('invalid');
				};
			};


			console.log(status);
		}
	});
}

console.log('apiHandler.js ready.');