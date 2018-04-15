export let events = {
    addClavierEvents : function(clavier) {
        window.addEventListener('keydown', function(e) {
            clavier.addTouche(e.keyCode);
        });
        window.addEventListener('keyup', function(e) {
            clavier.removeTouche(e.keyCode);
        });
    }
};