 var http = require('http');
 var fs = require('fs');
 var path = require('path');
 var url = require('url');

 http.createServer(function (request, response) {
 	 var requestedResource = url.parse(request.url, false).pathname;
     console.log('request starting for...' + requestedResource);

         var filePath = '.' + request.url;
         if (filePath == './')
                 filePath = './infinitescroll.html';

             console.log("requested path:" + filePath);

             var queryObject = url.parse(request.url, true).query;
             var searchString = url.parse(request.url, true).search;
             var pathString = url.parse(request.url, true).path;

             console.log("Query Object " + queryObject.page);
             console.log("Query search " + searchString);
             console.log("Query path " + pathString);
             

         var extname = path.extname(requestedResource);

         console.log("extension name = " + extname);

         var contentType = 'text/html';
         switch (extname) {
                 case '.js':
                         contentType = 'text/javascript';
                         break;
                 case '.css':
                         contentType = 'text/css';
                         break;
                 case 'json':
                         contentType = 'application/json';
                         break;
                 default :
                 		contentType = 'text/html';
         }

         fs.exists('.' + requestedResource, function(exists) {

                 if (exists) {

                 	console.log("file " + filePath + " was found");
                         fs.readFile(filePath, function(error, content) {
                                 if (error) {
                                         response.writeHead(500);
                                         response.end();
                                 }
                                 else {
                                         response.writeHead(200, { 'Content-Type': contentType });
                                         response.end(content, 'utf-8');
                                 }
                         });
                 }
                 else {
                 	console.log("not found " + filePath);
                         response.writeHead(404);
                         response.end();
                 }
         });

 }).listen(8333);
 console.log('Web Server running on port 80'); 
