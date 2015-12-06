var http = require("http"),
	url = require("url");

function start( route ){
	function onRequest( request, response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " recieved.");

		route( pathname );		

		response.writeHead( 200, { "Content-type": "text/plain" });
		response.write( "Hello..!!" );
		response.end();
	}

	var server = http.createServer( onRequest);
	
	server.listen(8888);
	console.log("Server started.");
}

exports.start = start;
