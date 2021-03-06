var querystring = require( 'querystring' ),
    fs = require( 'fs' ),
    formidable = require( 'formidable' );

function start( response ) {
	console.log( " Request Handler 'start' was called." );

	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html; '+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post" enctype="multipart/form-data"> ' +
		'<input type="file" name="upload" > ' +
		'<input type="submit" value="Submit text" />'+
		'</form>'+
		'</body>'+
		'</html>';

	response.writeHead( 200, { "Content-Type": "text/html" });
	response.write( body );
	response.end();
}

function upload( response, request ) {
	console.log( "Request Handler 'upload' was called." );

	var form = new formidable.IncomingForm();
	console.log( "about to parse" );
	form.parse( request, function( error, fields, files ){
		console.log( 'parsing done' );
		console.log( files );
		/* possible err in windows: tried to rename already existing file*/
		fs.rename( files.upload.path, "/tmp/test.png" , function(error) {
			if(error){
			fs.unlink( "/tmp/test.png" );
			fs.rename( files.upload.path, "/tmp/test.png");
			}
		console.log( files );
		}); 
	});

	response.writeHead( 200, { "Content-Type": "text/html" });
	response.write( "Recieved Image : <br>" );
	response.write( "<img src='/show' />" );
	response.end();
}

function show( response ) {
	console.log( "Request handler 'show' was called." );
	fs.readFile( "tmp/test.png", "binary", function( error, file){
		if( error ) {
		response.writeHead( '500', {"Content-Type": "text/plain"});
		response.write( error + '/n' );
		response.end();
		}
		else{
		response.writeHead( 200, {"Content-Type": "image/png"});
		response.write( file, "binary" );
		response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;
