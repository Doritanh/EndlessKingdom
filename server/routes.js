const fs = require('fs');
const path = require('path');

// Tableau de mimeType
const  mimeTypes = {
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

module.exports = function(req, res) {
    // filePath contient l'adresse désiré
    let filePath = '.' + req.url;
    // Si l'adresse est la racine, on redirige vers le defaut
    if (filePath == './') filePath = './client/identification/index.html';
    // On selectionne l'extension contenu dans le filePath
    let extname = String(path.extname(filePath)).toLowerCase();
    // On set le type de contenu grâce au tableau du mimeType
    var contentType = mimeTypes[extname] || 'application/octet-stream';

    // On essaye de lire le fichier contenu à l'adresse filePath
    fs.readFile(filePath, function(error, content) {
        if (error) {
            // Code d'erreur ENOENT, page non trouvé, redirection à l'index
            if(error.code == 'ENOENT') {
                fs.readFile('./client/identification/index.html', function(error, content) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content, 'utf-8');
                });
            } else { // Si autre, on renvoie 500 à l'utilisateur
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                res.end();
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}
