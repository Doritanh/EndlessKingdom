const http = require('http');
const WebSocket = require('ws');
const routes = require('./server/routes');

http.createServer(function(request, response) {
    routes(request, response);
}).listen(80);

const wss = new WebSocket.Server({ port: 8080 });
const socket = require('./server/identification/sockets')(wss);

console.log("Serveur actif");
