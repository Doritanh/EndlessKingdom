module.exports = {
    checkPass : async function(mdpA, mdpB) {
        if (mdpA === mdpB) return true;
        return false;
    }
}
