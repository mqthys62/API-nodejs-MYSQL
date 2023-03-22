const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
    // Le salt sert à ajouter une chaîne de caractères aléatoire à la fin du mot de passe
    // avant de le hasher. Cela permet d'empêcher les attaques par dictionnaire.
    // Le nombre 10 est le nombre de tours de boucle que bcrypt va effectuer pour générer le salt.
    return await bcrypt.hash(password, 10);
}

const comparePassword = async (password, hash) => {
    // Compare le mot de passe en clair avec le hash.
    // Renvoi true si les deux sont identiques, sinon false.
    return await bcrypt.compare(password, hash);
}

// On exporte les fonctions pour pouvoir les utiliser dans d'autres fichiers.
module.exports = {
    encryptPassword,
    comparePassword
}