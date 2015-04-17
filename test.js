
var mongoose = require('mongoose');
var swig = require('swig');
var express = require('express');
var path = require('path');

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') == 'development') {
    mongoose.connect('mongodb://localhost/ventorydb');

    //Debug / Status info. All of this could be deleted without loss of functionality
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function(callback) {
        // console.log('Database connection established');
    });
}

var Schema = mongoose.Schema;

var reviewsSchema = new Schema({
	id: {type: Number},
	type: {type: String}
})

var usersSchema = new Schema({
	orders: {type: Array, required: true},
	reviews: [reviewsSchema]
});

mongoose.model('users', usersSchema);
mongoose.model('reviews', reviewsSchema);

var User = mongoose.model('users');
var Review = mongoose.model('reviews');

app.get('/users', function(req, res) {

});

function randString() {
	return Math.random().toString(35).slice(2);
}

var bigArray = [];
bigArray.length = 10000;

for (var i = 0; i < 1000; i++) {
	for (var j = 0; j < 10000; j++) {
		bigArray[i] = {timestamp: Date.now(), name: randString()};
	}
	var usr = new User({
		orders: bigArray
	});
	usr.reviews.length = 10000;
	for (var j = 0; j < 10000; j++) {
		usr.reviews.push(new Review({id: Date.now(), type: randString()}));
	}
	usr.save(function(err) {
		console.log('Error!' + i);
	});
}

console.log('Done!');