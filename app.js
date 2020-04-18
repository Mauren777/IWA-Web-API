var http = require('http'), //This module provides the HTTP server functionalities
    path = require('path'), //The path module provides utilities for working with file and directory paths
    express = require('express'); //This module allows this app to respond to HTTP Requests, defines the routing and renders back the required content

var router = express(); //The set our routing to be handled by Express
var server = http.createServer(router); //This is where our server gets created

router.use(express.static(path.resolve(__dirname, 'views'))); //We define the views folder as the one where all static content will be served
router.use(express.urlencoded({extended: true})); //We allow the data sent from the client to be coming in as part of the URL in GET and POST requests
router.use(express.json()); //We include support for JSON that is coming from the client


//We define the root of our website and render index.html located inside the views folder
router.get('/', function(req, res){
    res.render('index');
});

//This is where we as the server to be listening to user with a specified IP and Port
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});