var express = require('express');
var router = express.Router();
var userc = require('../controller/users')

router.post('/signup', function(req, res) {
	userc.addUser(req.body, function(result){
		res.send(result);
	});
});

module.exports = router;