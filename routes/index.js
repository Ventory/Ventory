var express = require('express');
var router = express.Router();
var userc = require('../controller/users');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title : "Ventory",
        content : "This is the content"
    });
});

router.get('/signup', function(req, res) {
	res.render('users/signup', {
		title: "Ventory - Sign Up",
		flashMessage: req.flash('loginError')
	})
});

router.post('/signup', function(req, res) {
	userc.addUser(req.body, function(err){
		if (err) {
			req.flash('loginError', err);
			res.redirect('/signup');
		} else {
			res.redirect('/signupsuccess')
		}
	});
});

module.exports = router;
