var app = require("./app");
var port = process.env.PORT || 3000;
// Start Server for API
var server = app.listen(port, function() {
	console.log("Express server listening on port " + port);
});
var r = require("rethinkdb");

var dbconfig = {host: "localhost", port: 28015, db: "testProject"};

var io = require("socket.io")(server);
//Set up WebSocket to client
io.on("connection", function(socket){
	r.connect( dbconfig, function(err, conn) {
		if (err) throw err;
		// Set up change feed for the tracks table and push any updates 
		// real-time to client via websocket
	    r.table("tracks").changes().run(conn, function(err, cursor) {
	    	cursor.each(function(err, row){
				socket.emit("pushUpdatesToClient", row.new_val);
	    	});
		});
	});
});