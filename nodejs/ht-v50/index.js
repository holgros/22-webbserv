// Kolla att serverskriptet körs
console.log("Hej NodeJS!");

// starta en väldigt enkel webbserver med NodeJS
var http = require('http');
http.createServer(function (req, res) {
    console.log("Någon laddade webbsidan.");
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
}).listen(8080);
console.log("Servern körs på port 8080.");
