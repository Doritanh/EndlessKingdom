export class vueMenu {
    constructor(modele) {
        this._modele = modele;
        this._element = document.querySelector("#menu");
    }

    afficher() {
        this._element.style.display = "block";
    }

    cacher() {
        this._element.style.display = "none";
    }

    /**
     * Ajoute un donjon au menu
     * @param {String} nom 
     * @param {String} niveau 
     * @param {String} mode
     */
    addDonjon(nom, niveau, mode) {
        let trDonjon = document.createElement("tr");

        let tdNom = document.createElement('td');
        let nomDonjon = document.createTextNode(nom);
        tdNom.appendChild(nomDonjon);
        trDonjon.appendChild(tdNom);

        let tdNiveau = document.createElement('td');
        let niveauDonjon = document.createTextNode(niveau);
        tdNiveau.appendChild(niveauDonjon);
        trDonjon.appendChild(tdNiveau);

        let tdMode = document.createElement('td');
        let modeDonjon = document.createTextNode(mode);
        let btnMode = document.createElement('button');
        btnMode.appendChild(modeDonjon);
        tdMode.appendChild(btnMode);
        trDonjon.appendChild(tdMode);

        listeDonjons.appendChild(trDonjon);
    }
}