const http = require('http');
const routes = require('./server/routes');

http.createServer(function(request, response) {
    routes(request, response);
}).listen(80);

console.log("Serveur actif");
