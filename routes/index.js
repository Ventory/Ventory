var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: 'Express',
  	partials: {
  		partHeader: '../views/partials/part-header',
  		partFooter: '../views/partials/part-footer'
  	}
  });
});

module.exports = router;
