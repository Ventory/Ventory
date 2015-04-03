var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	// Admin Info
	createdAt: { type: Date, default: Date.now },
	type: { type: Number, default: 0 },
	passwordHash: { type: String, required: true },
	// Status
	suspended: { type: Number, default: 0 },
	ipHistory: { type: Array, default: [] },
	searchHistory: { type: Array, default: [] },
	categoryHistory: { type: Array, default: [] },
	// Profile Info
	email: { type: String, required: true, trim: true},
	name: { type: String, required: true, trim: true},
	firstname: { type: String, required: true, trim: true},
	gender: { type: Number, required: true},
	language: { type: String, required: true},
	settings: { type: Array, default: [] },
	picture: { type: String },
	pictureThumbnail: { type: String},
	address: { type: String },
	country: { type: String },
	// Market
	companyName: { type: String },
	orders: [ordersSchema],
	subusers: { type: Array, default: [] }
});

usersSchema.methods.fullName = function() {
	var fullName = this.vname + ' ' + this.nname;
	return fullName;
}

usersSchema.methods.validatePassword = function(pwd, callback) {
    var hash = this.passwordHash;
    bcrypt.compare(pwd, hash, function(err, res) {
    	return callback(res);
	});
};

mongoose.model('users', usersSchema);