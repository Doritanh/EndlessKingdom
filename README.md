# Endless Kingdom

Bievenue sur le git d'EndlessKingdom !

## Table des matières

1. Lancer le serveur en local
2. Contribuer au jeu

## Lancer le serveur en local

Pour lancer le serveur en local, il vous faut plusieurs logiciel :

* node.js
* mongoDB
* un naviguateur web

Bien sûr il vous faut aussi une version de ce code (téléchargement ou git clone).

Pour commencer, lancer le serveur mongodb. (La procédure est expliqué dans la doc de mongodb, mais si vous l'avez installé sous windows, vous devriez lancer mongod.exe qui se trouve dans le repertoire d'installation de mongodb. Si ce dernier ne se lance pas, essayer de créer le dossier /data/db à la racine de votre disque dur).

Ensuite, lancer node en command prompt, et déplacer vous dans le repertoire d'Endless Kingdom. Effectuer la commande : `npm install` pour installer les dépendances du projet.

Finalement, effectuer la commande `node app.js`. Votre serveur local est lancé !

Pour y accéder, ouvrez votre naviguateur et taper l'adresse [localhost](https://localhost).

## Contribuer au jeu

Pour contribuer au jeu, ouvrez une branche sur le git. Quand vos modifications sont terminés, pusher-les, et faites une demande de merge. Un adminsitrateur du projet pourra vous merge si votre travail est convenable !
