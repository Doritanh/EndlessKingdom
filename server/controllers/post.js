'use strict';

const qs = require('querystring');

module.exports = {
    /**
     *  Parse le contenu post
     */
    getData : function(request) {
        let body = '';
        request.on('data', function (data) {
            body += data;
            // Si le corps est trop long, on tue la connexion
            if (body.length > 1e6)
                request.connection.destroy();
        });
        let promise = new Promise(function(resolve, reject) {
            request.on('end', function () {
                return resolve(qs.parse(body));
            });
        });
        return promise;
    }
}
