import {Vue} from '../vue.js';

export class VueCreationPerso extends Vue{
    constructor(modele) {
        super(modele);
        this._element = document.querySelector('#creationPerso');
        let form = this._element.querySelector('form');
        form.addEventListener('submit', function submit(e) {
            e.preventDefault();
            form.removeEventListener('submit', submit, false);
            let nom = form.querySelector('input[name="nom"]');
            let arrayDifficultes = form.querySelectorAll('input[name="difficulte"]');
            let difficulte;
            arrayDifficultes.forEach(function(item) {
                if (item.checked) difficulte = item;
            });
            socket.send(JSON.stringify({
                'id' : 'creationPerso',
                'values' : {
                    'nom' : nom.value,
                    'difficulte' : difficulte.value
                }
            }));
        }, false);
    }
}