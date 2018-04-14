'use strict';

const fs = require('fs');

module.exports = {
    send : function(path) {
        let promise = new Promise(function(resolve, reject) {
            fs.readFile(path, function(err, content) {
                if (err) reject(err);
                resolve(content);
            });
        });
        return promise;
    },
    sendNotFound : function() {
        let promise = new Promise(function(resolve, reject) {
            fs.readFile('./client/identification/index.html', function(err, content) {
                if (err) reject(err);
                resolve(content);
            });
        });
        return promise;
    }
}
