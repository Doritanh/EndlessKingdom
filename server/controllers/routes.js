'use strict';

const pages = require('./pages');
const mimetypes = require('./mimetypes');
const post = require('./post');
const identification = require('../identification/identification');

module.exports = async function(req, res) {
    let codeErreur = 0;

    let chemin = '.' + req.url;
    if (chemin === './') {
        chemin = './client/identification/index.html';
    } else if (chemin === './jeu/' || chemin === './client/jeu/index.html') {
        chemin = './client/jeu/index.html';
        let data = await post.getData(req);
        if (data.pseudo === 'undefined' || data.mdp === 'undefined') {
            codeErreur = 1;
        } else {
            let connexion = await identification.connexion(data.pseudo, data.mdp);
            if (connexion !== 1) codeErreur = 1;
        }
    } else if (!chemin.startsWith("./client/")) {
        chemin = './client/identification/index.html';
    }

    let content;
    try {
        content = await pages.send(chemin);
    } catch (error) {
        if (error.code == 'ENOENT') codeErreur = 1;
        else codeErreur = 2;
    }

    switch (codeErreur) {
        case 0:
            res.writeHead(200, { 'Content-Type': mimetypes.get(chemin) });
            res.end(content, 'utf-8');
            break;
        case 1:
            res.writeHead(302, {'Location': '/'});
            res.end();
            break;
        default:
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: '+e.code);
            res.end();
            break;
    }
}
