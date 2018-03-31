const http = require('http');
const routes = require('./server/routes');

let server = http.createServer(function(req, res) {
    switch (req.url) {
        case '/':
            routes.identification.index(req, res);
            break;
        case '/client/identification/css/default.css':
            routes.identification.css.default(req, res);
            break;
        default:
            routes.identification.index(req, res);
            break;
    }
});

server.listen(80);

console.log("Serveur actif")
