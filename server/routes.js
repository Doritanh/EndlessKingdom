const fs = require('fs');

module.exports = {
    identification : {
        index : function(req, res) {
           fs.readFile('client/identification/index.html', (err, data) => {
               if (err) throw err;
               res.writeHead(200, {"Content-Type": "text/html"});
               res.write(data);
               res.end();
           });
       },
       defaultcss : function(req, res) {
           fs.readFile('client/identification/css/default.css', (err, data) => {
               if (err) throw err;
               res.writeHead(200, {"Content-Type": "text/css"});
               res.write(data);
               res.end();
           });
       }
    }
}
