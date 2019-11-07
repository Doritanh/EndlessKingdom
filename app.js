const http = require('http');
const WebSocket = require('ws');
const routes = require('./server/controllers/routes');

http.createServer(function(request, response) {
    routes(request, response);
}).listen(8000);

const main = require('./server/main')(new WebSocket.Server({ port: 8080 }));

console.log("Serveur actif");
