var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
var r = require('rethinkdb');
var dbconfig = {host: 'localhost', port: 28015, db: "testProject"};

function setHeadersAndSend(res, result) {
	// ALlow cross site requests
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.send(result);
}

function handleError(res) {
    return function(error) {
        setHeadersAndSend(res, error.message);
    }
}

router.get('/tracks', function(req, res, next) {
	r.connect(dbconfig, function(err, conn) {
		if (err) throw err;
	    r.table('tracks').orderBy({index: "createdAt"}).run(conn).then(function(cursor) {
	        return cursor.toArray();
	    }).then(function(result) {
	        setHeadersAndSend(res, JSON.stringify(result));
	    }).error(handleError(res))
	    .finally(next);
	});
});

router.post('/tracks/new', function(req, res, next) {
    var tracks = req.body;
    var toSend = [];
	r.connect(dbconfig, function(err, conn) {
		if (err) throw err;
		for (i in tracks)
		{
			tracks[i].createdAt = r.now();
			r.table('tracks').insert(tracks[i], {returnChanges: true}).run(conn).then(function(result) {
		        if (result.inserted !== 1) {
		            handleError(res)(new Error("Document was not inserted."));
		        }
		        else {
		        	toSend.push(JSON.stringify(result.changes[0].new_val));
		        }
	    	}).error(handleError(res)).finally(next);
		}
	});
	setHeadersAndSend(res, toSend);
});

module.exports = router;