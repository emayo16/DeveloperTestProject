var r = require('rethinkdb');

var dbconfig = {host: 'localhost', port: 28015, db: "testProject"};


r.connect( dbconfig, function(err, conn) {
	if (err) throw err;
    // Check to see that 'tracks' table is created with index 'createdAt'
    r.table('tracks').indexWait('createdAt').run(conn).then(function(err, result) {
        console.log("tracks table is created.");
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
    "speed": "10.6", "course": "90", "heading": "90"},
    { "name": "Carnival Ecstacy", 
    "latitude": "32.78083", "longitude": "-79.9234", "callsign": "H3GR", 
    "mmsid": "353479000", "speed": "10.6", "course": "90", "heading": "90"}, 
    { "name": "Carnival Ecstacy2", "latitude": "44.78083", 
    "longitude": "-60.9234", "callsign": "H3GR", "mmsid": "353478000", 
    "speed": "10.6", "course": "90", "heading": "90"}, 
    { "name": "Carnival Ecstacy3", "latitude": "20.78083", 
    "longitude": "-48.9234", "callsign": "H3GR", "mmsid": "353477000", 
    "speed": "10.6", "course": "90", "heading": "90"}, 
    { "name": "Carnival Ecstacy4", "latitude": "23.78083", 
    "longitude": "-50.9234", "callsign": "H3GR", "mmsid": "353477000", 
    "speed": "10.6", "course": "90", "heading": "90"}, 
    { "name": "Carnival Ecstacy5", "latitude": "25.78083", 
    "longitude": "-52.9234", "callsign": "H3GR", "mmsid": "353477000", 
    "speed": "10.6", "course": "90", "heading": "90"},
    { "name": "Carnival Ecstacy6", 
    "latitude": "12.78083", "longitude": "-40.9234", "callsign": "H3GR", 
    "mmsid": "353479000", "speed": "10.6", "course": "90", "heading": "90"}, 
    { "name": "Carnival Ecstacy7", "latitude": "44.78083", 
    "longitude": "-55.9234", "callsign": "H3GR", "mmsid": "353478000", 
    "speed": "10.6", "course": "90", "heading": "90"}, 
    { "name": "Carnival Ecstacy8", "latitude": "60.78083", 
    "longitude": "-23.9234", "callsign": "H3GR", "mmsid": "353477000", 
    "speed": "10.6", "course": "90", "heading": "90"}, 
    { "name": "Carnival Ecstacy9", "latitude": "35.78083", 
    "longitude": "-60.9234", "callsign": "H3GR", "mmsid": "353477000", 
    "speed": "10.6", "course": "90", "heading": "90"}, 
    { "name": "Carnival Ecstacy10", "latitude": "34.78083", 
    "longitude": "-44.9234", "callsign": "H3GR", "mmsid": "353477000", 
    "speed": "10.6", "course": "90", "heading": "90"},
    { "name": "UNDERSEA HUNTER", 
    "latitude": "30.5899696", "longitude": "-117.440498", "callsign": "YJWD2", 
    "mmsid": "577357000", "speed": "7.5", "course": "197", "heading": "180"}];
    // Insert Test Track Data in DB
    r.table('tracks').insert(testTracks).run(conn, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    });
});