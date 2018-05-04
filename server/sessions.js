'use strict';

module.exports =  class Sessions {
    constructor() {
        this.liste = {};
    }

    ajouter(pseudo) {
        let id = 0;
        do {
            id = generateID();
        } while (this.has(id));
        this.liste[id] = pseudo;
        return id;
    }

    supprimer(id) {
        this.liste[id] = null;
    }

    get(id) {
        return this.liste[id];
    }

    has(id) {
        let has = false;
        if (this.liste.hasOwnProperty(id)) {
            if (this.liste[id] !== null) {
                has = true;
            }
        }
        return has;
    }
}

let generateID = function() {
    var key = ['1', '2', '3', '4', '5', '6']
    return Math.floor(Math.random() * 1000000000);
} 

/*
let getRandomKey = function(number) {
    var key = ['1', '2', '3', '4', '5', '6', '7', '8', '9',
    	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
      'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let numberMod = number%key.length;
    return key[numberMod];
}

let genererCle = function(size) {
		let rand1 = Math.random();
    let rand2 = Math.random();
    for (var i = 0; i < 10; i++) {
    	rand1 *= 10;
      rand2 *= 10;
    }
    rand1 = Math.floor(rand1);
    rand2 = Math.floor(rand2);
    console.log(rand1)
    console.log(rand2)
    var cle = rand1*rand2;
    cle = cle.toString();
    if (cle.length < 20)  {
    	var manquant = 20 - cle.length;
      for (var i = 0; i < manquant; i++) {
      	cle += '0';
      }
    }
    return cle;
}

let generateID = function() {
   var cle1 = genererCle();
   console.log(cle1)
   var cle2 = genererCle();
   console.log(cle2)
   var cle = '';
   for (var i = 0; i < cle1.length; i++) {
    	let number = parseInt(cle1.charAt(i))*parseInt(cle2.charAt(i));
      console.log(number)
      cle += getRandomKey(number);
    }
    return cle;
} 

document.querySelector('#button').addEventListener('click', e => {
	let id = generateID();
  document.querySelector('#result').textContent = id;
});
*/