var express = require('express');
var router = express.Router();


var partialSource = {
	standard : {
		partHeader: '../views/partials/part-header',
  		partFooter: '../views/partials/part-footer' 
	}
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: 'Express',
  	partials: partialSource.standard
  });
});

module.exports = router;
