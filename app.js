const http = require('http');
const WebSocket = require('ws');
const routes = require('./server/controllers/routes');

http.createServer(function(request, response) {
    routes(request, response);
}).listen(80);

const socket = require('./server/sockets')(new WebSocket.Server({ port: 8080 }));

console.log("Serveur actif");
