module.exports = {
    check : async function(mdpA, mdpB) {
        if (mdpA === mdpB) return true;
        return false;
    },
    hash : async function(mdp) {
        return mdp;
    }
}
