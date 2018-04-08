'use strict';

const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const mimeTypes = require('./mimetypes');
const identification = require('../identification/identification');

module.exports = async function(req, res) {
    let chemin = getChemin(req.url);
    let typeContenu = getTypeContenu(chemin);

    if (req.method == 'POST') {
        console.log(chemin)
        if (chemin === './client/jeu/index.html') {
            let data = await getPostData(req);
            let connexion = await identification.connexion(data.pseudo, data.mdp);
            console.log(connexion)
            if (connexion != 1) {
                chemin = './client/identification/index.html';
            }
        }
    }

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
    if (path == './') {
        return './client/identification/index.html';
    } else if (path == './jeu/' || path == './client/jeu/index.html') {
        return './client/jeu/index.html';
    } else if (!path.startsWith("./client/")) {
        return './client/identification/index.html';
    }
    return path;
}

/**
 *  Parse le contenu post
 */
let getPostData = function(request) {
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
