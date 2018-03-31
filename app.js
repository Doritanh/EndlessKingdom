const http = require('http');
const fs = require('fs');

let identification = function(req, res) {
    fs.readFile('client/identification/index.html', (err, data) => {
        if (err) throw err;
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(data);
        res.end();
    });
};

http.createServer(identification).listen(80);

console.log("Serveur lancer")
