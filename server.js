var http = require("http");

function start(){
	function onRequest( request, response){
		console.log("Request recieved.");
		response.writeHead( 200, { "Content-type": "text/plain" });
		response.write( "Hello..!!" );
		response.end();
	}

	var server = http.createServer( onRequest);
	
	server.listen(8888);
	console.log("Server started.");
}

exports.start = start;
