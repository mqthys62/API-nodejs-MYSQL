
// try {    
// } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//         error: true,
//         message: "Une erreur interne est survenue, veuillez réessayer plus tard."
//     });
// }

// Importation du modèle PostType
const PostType = require("../models/postType.model");

// Fonction create du CRUD : elle va permettre de créer un nouvel élément dans la BDD
exports.Create = async (req, res) => {
    try {
        // On récupère le name depuis le corps de la requête.
        const { name } = req.body;

        // 
        if (!name) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const isExist = await PostType.findOne({ where: { name: name } });

        if (isExist) {
            return res.status(400).json({
                error: true,
                message: `Le type : ${name}, existe déjà.`
            });
        }

        await new PostType({ name: name }).save();

        return res.status(201).json({
            error: false,
            message: "Le type de post a bien été créé."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.GetAll = async (req, res) => {
    try {
        const postsTypes = await PostType.findAll();

        return res.status(200).json({
            error: false,
            message: "Les données ont bien été récupérées.",
            postsTypes: postsTypes
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.GetById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const postType = await PostType.findOne({ where: { id: id } });

        if (!postType) {
            return res.status(404).json({
                error: true,
                message: `Le type de post n°${id} n'existe pas.`
            });
        }

        return res.status(200).json({
            error: false,
            message: "Le type de post a bien été récupéré.",
            postType: postType
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.Update = async (req, res) => {
    try {
        const { id, name } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const postType = await PostType.findOne({ where: { id: id } });

        if (!postType) {
            return res.status(404).json({
                error: true,
                message: `Le type de post n°${id} n'existe pas.`
            });
        }

        const postTypeData = {
            name: name ? name : postType.name
        }

        await postType.update(postTypeData);
        return res.status(200).json({
            error: false,
            message: "Le type de post a bien été mis à jour."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.Delete = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const postType = await PostType.findOne({ where: { id: id } });

        if (!postType) {
            return res.status(404).json({
                error: true,
                message: `Le type de post n°${id} n'existe pas.`
            });
        }

        await postType.destroy();
        return res.status(200).json({
            error: false,
            message: `Le type de post ${postType.name} a bien été supprimé.`
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}