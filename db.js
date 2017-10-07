var r = require('rethinkdb');

var dbconfig = {host: 'localhost', port: 28015, db: "testProject"};


r.connect( dbconfig, function(err, conn) {
	if (err) throw err;
    // Check to see that 'tracks' table is created with index 'createdAt'
    r.table('tracks').indexWait('createdAt').run(conn).then(function(err, result) {
        console.log("tracks table is");
    }).error(function(err) {
        // The database/table/index do not exist. Create them.
        r.dbCreate(dbconfig.db).run(conn).finally(function() {
            return r.tableCreate('tracks').run(conn)
        }).finally(function() {
            r.table('tracks').indexCreate('createdAt').run(conn);
        }).finally(function(result) {
            r.table('tracks').indexWait('createdAt').run(conn)
        }).then(function(result) {
            console.log("'tracks' table was created with index 'createdAt'");
        }).error(function(err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            console.log("'tracks' table was created with index 'createdAt'");
        });
    });
    var testTracks = [{ "createdAt": r.now(), "name": "Carnival Ecstacy", 
    "latitude": "32.78083", "longitude": "-79.9234", "callsign": "H3GR", 
    "mmsid": "353479000", "speed": "10.6", "course": "90", "heading": "90"}, 
    { "createdAt": r.now(), "name": "Carnival Ecstacy2", "latitude": "44.78083", 
    "longitude": "-60.9234", "callsign": "H3GR", "mmsid": "353478000", 
    "speed": "10.6", "course": "90", "heading": "90"}, 
    { "createdAt": r.now(), "name": "Carnival Ecstacy3", "latitude": "20.78083", 
    "longitude": "-48.9234", "callsign": "H3GR", "mmsid": "353477000", 
    "speed": "10.6", "course": "90", "heading": "90"}, 
    { "createdAt": r.now(), "name": "Carnival Ecstacy4", "latitude": "23.78083", 
    "longitude": "-50.9234", "callsign": "H3GR", "mmsid": "353477000", 
    "speed": "10.6", "course": "90", "heading": "90"}, 
    { "createdAt": r.now(), "name": "Carnival Ecstacy5", "latitude": "25.78083", 
    "longitude": "-52.9234", "callsign": "H3GR", "mmsid": "353477000", 
    "speed": "10.6", "course": "90", "heading": "90"}];
    // Insert Test Track Data in DB
    r.table('tracks').insert(testTracks).run(conn, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });
});