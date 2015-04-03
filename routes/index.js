var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title : "This is the title",
        content : "This is the content"
    });
});

module.exports = router;
