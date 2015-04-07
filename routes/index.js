var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title : "Ventory",
        content : "This is the content"
    });
});

router.get('/signup', function(req, res) {
	res.render('users/signup', {
		title: "Ventory - Sign Up"
	})
});

module.exports = router;
