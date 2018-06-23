import {Vue} from '../vue.js';

export class VueCreationPerso extends Vue{
    constructor(modele) {
        super(modele);
        this._element = document.querySelector('#creationPerso');
        let form = this._element.querySelector('form');
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let nom = form.querySelector('input[name="nom"]');
            console.log(nom)
            if (nom.value == '') {
                this._element.querySelector('.message').textContent = 'Le nom ne doit pas être vide.';
                this._element.querySelector('.message').style.display = 'block';
            } else {
                let arrayDifficultes = form.querySelectorAll('input[name="difficulte"]');
                let difficulte;
                arrayDifficultes.forEach(function(item) {
                    if (item.checked) difficulte = item;
                });
                let arrayClasses = form.querySelectorAll('input[name="classe"]');
                let classe;
                arrayClasses.forEach(function(item) {
                    if (item.checked) classe = item;
                });
                this._modele.nouveauPersonnage(nom.value, difficulte.value, classe.value);
            }
        }.bind(this), false);
    }
}