SignupResult = function() {
	this.status = 0;
	this.errors = [];
	this.fields = [];
}
SignupResult.prototype.addError = function(msg, fields, developer) {
	this.status = 1;
	var dev = false;
	if (typeof(fields) != "Array") {
		if (typeof(fields) == "boolean") dev = fields;
	}
	else {
		if (typeof(developer) == "boolean") dev = developer;
		this.fields.concat(fields);
	}
	this.errors.push({msg: msg, dev: dev});
}

module.exports = {
	getUsers: function(criteria, callback){},
	getUser: function(criteria, callback){},
	addUser: function(userobj, callback) {
		res = new SignupResult();
		if (!userobj.password || !userobj.password.first.trim()) {
			res.addError("Please specify a password", ["password"]);
		}
		if (userobj.password.first != userobj.password.repeat) {
			res.addError("The passwords do not match", ["password", "passwordrep"]);
		}
		if (!userobj.email || !userobj.email.match(new RegEx("\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b"))) {
			res.addError("Please specify a valid email", ["email"]);
		}
		if (!userobj.agree) {
			res.addError("You need to agree to the Terms of Service in order to login", ["agree"]);
		}
		if (res.status == 1) return callback(res);
		bcrypt.genSalt(10, function(err, salt) {
			if (err) {
				res.addError(JSON.stringify(err), true);
				return callback(res);
			}
    		bcrypt.hash(userobj.password, salt, function(err, hash) {
    			if (err) {
    				res.addError(JSON.stringify(err), true);
    				return callback(res);
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
						res.addError(JSON.stringify(err), true);
					}
					callback(res);
				});
    		});
		});
	},
	remUser: function(user){},
	search: function(term, dim){
		
	},
}