var express = require('express');
var router = express.Router();

router.post('/signup', function(req, res) {
	userc.addUser(req.body, function(result){
		res.send(JSON.stringify(result));
		res.close();
	});
});

module.exports = router;