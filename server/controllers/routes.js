'use strict';

const fs = require('fs');
const path = require('path');
const  mimeTypes = require('./mimetypes');

module.exports = async function(req, res) {
    let chemin = getChemin(req.url);
    let typeContenu = getTypeContenu(chemin);

    let content;
    try {
        content = await sendPage(chemin);
    } catch (e) {
        if (e.code == 'ENOENT') {
            return send404();
        } else {
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            res.end();
            return;
        }
    }
    res.writeHead(200, { 'Content-Type': typeContenu });
    res.end(content, 'utf-8');
}

/**
 *  Selectionne le chemin de l'utilisateur
 */
let getChemin = function(url) {
    let path = '.' + url;
    let chemin = '';
    if (path == './') {
        chemin = './client/identification/index.html';
    } else if (path == './jeu/' || path == './client/jeu/index.html') {
        chemin = './client/jeu/index.html';
    } else if (!path.startsWith("./client/")) {
        chemin = './client/identification/index.html';
    } else {
        chemin = path;
    }
    return chemin;
}

/**
 *  Obtient le type de contenu d'un fichier
 */
let getTypeContenu = function(chemin) {
    let extname = String(path.extname(chemin)).toLowerCase();
    return mimeTypes[extname] || 'application/octet-stream';
}

/**
 *  Envoie une page à l'utilisateur
 */
let sendPage = async function(path) {
    let promise = new Promise(function(resolve, reject) {
        fs.readFile(path, function(err, content) {
            if (err) reject();
            resolve(content);
        });
    });
    return promise;
}

let send404 = async function() {
    let promise = new Promise(function(resolve, reject) {
        fs.readFile('./client/identification/index.html', function(err, content) {
            if (err) reject();
            resolve(content);
        });
    });
    return promise;
}
