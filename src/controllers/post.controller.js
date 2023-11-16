const Post = require('../models/post.model');

exports.Create = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { id: postedBy } = req.decoded;

        if (!title || !content) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }



        const postData = {
            title: title,
            content: content,
            postedBy: postedBy
        }

        await new Post(postData).save();

        return res.status(201).json({
            error: false,
            message: "Le post a été créé avec succès.",
            data: postData
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }

}

exports.GetAll = async (req, res) => {
    try {
        const posts = await Post.findAll();

        return res.status(200).json({
            error: false,
            message: "Les données ont été récupérées.",
            posts: posts
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur est survenue, veuillez réessayer plus tard."
        })
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

        const post = await Post.findOne({ where: { id: id } });

        if (!post) {
            return res.status(404).json({
                error: true,
                message: "Le post est introuvable."
            });
        }

        return res.status(200).json({
            error: false,
            message: "Le post a été récupéré.",
            post: post
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.Update = async (req, res) => {
    try {
        const { title, content, id} = req.body;

        if (!id || isNaN(id)) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const post = await Post.findOne({ where: { id: id } });

        if (!post) {
            return res.status(404).json({
                error: true,
                message: "Le post est introuvable."
            });
        }

        const postData = {
            title: title ? title : post.title,
            content: content ? content : post.content,
        }

        await post.update(postData);

        return res.status(200).json({
            error: false,
            message: "Le post a bien été mis à jour."
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur est survenue, veuillez réessayer plus tard."
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

        const post = await Post.findOne({ where: { id: id } });

        if (!post) {
            return res.status(404).json({
                error: true,
                message: "Le post est introuvable."
            });
        }

        await post.destroy();
        return res.status(200).json({
            error: true,
            message: "Le post a bien été supprimé."
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}