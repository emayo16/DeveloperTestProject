var express = require('express');
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = router;
