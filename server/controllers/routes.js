'use strict';

const pages = require('./pages');
const mimetypes = require('./mimetypes');
const post = require('./post');
const identification = require('../identification/identification');

module.exports = async function(req, res) {
    let chemin = '.' + req.url;
    
    if (chemin === './') {
        chemin = './client/identification/index.html';
    } else if (chemin === './jeu/' || chemin === './client/jeu/index.html') {
        chemin = './client/jeu/index.html';
        let data = await post.getData(req);
        if (data.pseudo != 'undefined' && data.mdp != 'undefined') {
            let connexion = await identification.connexion(data.pseudo, data.mdp);
            if (connexion !== 1) {
                res.writeHead(302, {'Location': '/'});
                res.end();
                return;
            }
        }
    } else if (!chemin.startsWith("./client/")) {
        chemin = './client/identification/index.html';
    }

    let typeContenu = mimetypes.get(chemin);

    let content;
    try {
        content = await pages.send(chemin);
    } catch (e) {
        console.log(e)
        if (e.code === 'undefined') return;
        if (e.code == 'ENOENT') {
            return pages.sendNotFound();
        } else {
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: '+e.code);
            res.end();
            return;
        }
    }
    res.writeHead(200, { 'Content-Type': typeContenu });
    res.end(content, 'utf-8');
}
