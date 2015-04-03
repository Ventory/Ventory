var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users/index', {
        title : "This is the title for users",
        content : "This is content users"
    });
});

module.exports = router;
