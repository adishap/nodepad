var http = require("http"),
	url = require("url");

function start( route , handle ){
	function onRequest( request, response){
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " recieved.");

		request.setEncoding( 'utf8' );

		request.addListener( 'data', function(postDataChunk) {
			postData += postDataChunk;
			console.log( "Received postDataChunk '" + postDataChunk + "'." );
		});

		request.addListener( 'end', function() {
			route( handle, pathname, response, postData);
		});
	}

	var server = http.createServer( onRequest );
	
	server.listen(8888);
	console.log("Server started.");
}

exports.start = start;
