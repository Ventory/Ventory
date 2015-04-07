SignupResult.prototype = {
	status: 0,
	errors: [],
	addError: function(msg, fields, developer) {
		this.status = 1;
		if (typeof(field) == "boolean") {
			errors.push({msg: })
		}
		else {
			this.fields.concat(fields);
		}
	}
}

module.exports = {
	getUsers: function(criteria, callback){},
	getUser: function(criteria, callback){},
	addUser: function(userobj, callback) {
		res = new SignupResult();
		if (!userobj.password.trim()) {
			callbackobj
		}
		if (userobj.password != userobj.passwordrep) {
			callback(new Error('Passwörter stimmen nicht überein.'))
		}
		if (!userobj.name.trim()) {
			callback(new Error('Name kann nicht leer sein.'));
		}
		if (!userobj.firstname.trim()) {
			callback(new Error('Vorname kann nicht leer sein.'));
		}
		if (!userobj.email.match(new RegEx("\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b"))) {
			callback(new Error('Email ist nicht im korrekten Format.'))
		}
		if (!userobj.agree) {

		}
		bcrypt.genSalt(10, function(err, salt) {
    		bcrypt.hash(userobj.password, salt, function(err, hash) {
        		var signupAttempt = new User({
					passwordHash: hash,
					name: userobj.name,
					firstname: userobj.firstname,
					email: userobj.email.toLowerCase(),
					gender: userobj.gender,
					language: userobj.language
				});
				signupAttempt.save(function(err) {
					if (err) {
						callback(err);
					}
					else {
						callback();
					}
				});
    		});
		});
	},
	remUser: function(user){},
	search: function(term, dim){
		
	},
}