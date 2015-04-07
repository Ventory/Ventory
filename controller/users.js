SignupResult = function() {
	this.status = 0;
	this.errors = [];
	this.fields = [];
}
SignupResult.prototype.addError = function(msg, fields, dev) {
	this.status = 1;

	if (fields) {
		this.fields.concat(fields);
	}

	this.errors.push({msg: msg, dev: dev == true});
}

module.exports = {

	getUsers: function(criteria, callback){},

	getUser: function(criteria, callback){},

	addUser: function(userobj, callback) {
		
		var result = new SignupResult();
		if (!userobj.password || !userobj.password.first.trim()) {
			result.addError("Please specify a password", ["password"]);
		}
		if (userobj.password.first != userobj.password.repeat) {
			result.addError("The passwords do not match", ["password", "passwordrep"]);
		}
		if (!userobj.email || !userobj.email.match(new RegEx("\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b"))) {
			result.addError("Please specify a valid email", ["email"]);
		}
		if (!userobj.agree) {
			result.addError("You need to agree to the Terms of Service in order to login", ["agree"]);
		}
		if (result.status == 1) return callback(result);
		bcrypt.genSalt(10, function(err, salt) {
			if (err) {
				result.addError(JSON.stringify(err), false, true);
				return callback(result);
			}
    		bcrypt.hash(userobj.password, salt, function(err, hash) {
    			if (err) {
    				result.addError(JSON.stringify(err), false, true);
    				return callback(result);
    			}
        		var signupAttempt = new User({
					passwordHash: hash,
					name: "",
					firstname: "",
					email: userobj.email.toLowerCase(),
					gender: "",
					language: ""
				});
				signupAttempt.save(function(err) {
					if (err) {
						result.addError(JSON.stringify(err), false, true);
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