'use strict';

const path = require('path');
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml'
};

module.exports = {
    /**
     *  Obtient le type de contenu d'un fichier
     */
    get : function(fichier) {
       let extname = String(path.extname(fichier)).toLowerCase();
       return mimeTypes[extname] || 'application/octet-stream';
   }
}
