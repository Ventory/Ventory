var express = require('express');
var userc = require('../controller/users');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('users/index', {
        title : res.__("This is the %s title for users", res.__("awesome")),
        content : res.__("This is content users")
    });
});

router.post('/search.:format?', function(req, res) {

});

module.exports = router;
