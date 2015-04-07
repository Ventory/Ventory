SignupResult = function() {
	this.status = 0;
	this.errors = [];
}
SignupResult.prototype.addError = function(msg, field, dev) {
	this.status = 1;

	this.errors.push({msg: msg, dev: dev == true, field: field});
}

module.exports = {

	getUsers: function(criteria, callback){},

	getUser: function(criteria, callback){},

	addUser: function(userobj, callback) {



		var result = new SignupResult();
		if (!userobj.password || !userobj.password.first.trim()) {
			result.addError("Please specify a password", "password[first]");
		}
		if (userobj.password.first != userobj.password.repeat) {
			result.addError("The passwords do not match", "password[repeat]");
		}
		if (!userobj.email || !userobj.email.match("/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i")) {
			result.addError("Please specify a valid email", "email");
		}
		if (!userobj.agree) {
			result.addError("You need to agree to the Terms of Service in order to login", "agree");
		}
		if (result.status == 1) return callback(result);

		bcrypt.genSalt(10, function(err, salt) {
			if (err) {
				result.addError(JSON.stringify(err), null, true);
				return callback(result);
			}
    		bcrypt.hash(userobj.password, salt, function(err, hash) {
    			if (err) {
    				result.addError(JSON.stringify(err), null, true);
    				return callback(result);
    			}
        		var signupAttempt = new User({
					passwordHash: hash,
					name: "",
					firstname: "",
					email: userobj.email.toLowerCase(),
					gender: 0,
					language: "de"
				});
				signupAttempt.save(function(err) {
					if (err) {
						result.addError(JSON.stringify(err), null, true);
					}
					callback(result);
				});
    		});
		});
	},

	remUser: function(user){},

	search: function(term, dim){
		
	},
}