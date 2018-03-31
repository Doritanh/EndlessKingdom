const http = require('http');
const fs = require('fs');
const path = require('path');

let identification = function(req, res) {
    let index = path.normalize('client/indentification/index.html');
    fs.readFile(index, (err, data) => {
        if (err) throw err;
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        res.end();
    });
};

http.createServer(identification).listen(80);

console.log("Serveur lancer")
