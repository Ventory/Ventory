var express = require('express');
var userc = require('../controller/users');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('users/index', {
        title : res.__('users.index.title'),
        content : res.__('users.index.content')
    });
});

router.post('/search.:format?', function(req, res) {

});

module.exports = router;
