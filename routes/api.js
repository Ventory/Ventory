var express = require('express');
var router = express.Router();

router.post('/signup', function(req, res) {
	userc.addUser(req.body, function(res){
		res.send(res);
		res.close();
	});
});