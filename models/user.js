var mongoose = require('mongoose');
var orderSchema = require('./orders')
var Schema = mongoose.Schema;

var userSchema = new Schema({
	// Admin Info
	createdAt: { type: Date, default: Date.now },
	type: { type: Number, default: 0 },
	passwordHash: { type: String, required: true },
	// Status
	suspended: { type: Number, default: 0 },
	ipHistory: { type: Array, default: [] },
	searchHistory: { type: Array, default: [] },
	// Profile Info
	email: { type: String, required: true, trim: true},
	firstname: { type: String, required: true, trim: true},
	lastname: { type: String, required: true, trim: true},
	gender: { type: Number, required: true},
	settings: { type: Array, default: [] },
	picture: { type: String },
	pictureThumbnail: { type: String},
	address: { type: String },
	country: { type: String },
	// Market
	orders: [orderSchema],
});

userSchema.methods.fullName = function() {
	var fullName = this.vname + ' ' + this.nname;
	return fullName;
}

userSchema.methods.validatePassword = function(pwd, callback) {
    var hash = this.passwordHash;
    bcrypt.compare(pwd, hash, function(err, res) {
    	return callback(res);
	});
};

mongoose.model('user', userSchema);