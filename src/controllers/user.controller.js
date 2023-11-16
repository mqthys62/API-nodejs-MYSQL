const { Op } = require("sequelize");
const User = require("../models/user.model");
const { sendMail } = require("../utils/mailer.utils");
const { encryptPassword, comparePassword } = require("../utils/passwordHandler.utils");
const jwt = require('jsonwebtoken');

exports.SignUp = async (req, res) => {
    try {
        const { email, password, username } = req.body;

        if ( !email || !password || !username) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const nameRegex = /^[a-zA-Z]{MIN_CHARS,MAX_CHARS}$/i;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i;
        const usernameRegex = /^[a-zA-Z0-9._-]{MIN_CHARS,MAX_CHARS}$/i;


        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: true,
                message: "L'adresse email est invalide."
            });
        }

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error: true,
                message: "Le mot de passe doit contenir au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial."
            });
        }

        // if (!usernameRegex.test(username)) {
        //     return res.status(400).json({
        //         error: true,
        //         message: "Le nom d'utilisateur doit contenir au moins 2 caractères et ne doit pas contenir de caractères spéciaux."
        //     });
        // }

        const isExist = await User.findOne({ where: { [Op.or]: [{ email: email }, { username: username }] } });

        if (isExist) {
            return res.status(409).json({
                error: true,
                message: "L'utilisateur existe déjà."
            });
        }

        const encodedPassword = await encryptPassword(password);
        // Générer un code à 6 chiffres
        // const code = Math.floor(100000 + Math.random() * 900000);

        const userData = {
            username: username,
            email: email,
            password: encodedPassword,
            // emailVerificationCode: code,
            // // Rajouter 15 minutes à la date actuelle
            // emailVerificationCodeExpiration: new Date(Date.now() + 15 * 60 * 1000)
            isActive: true
        }

        // Envoi de l'email de vérification
        // await sendMail("accountVerification", { code: code }, email);

        await new User(userData).save();
        return res.status(201).json({
            error: false,
            message: "L'utilisateur a été créé avec succès."
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.VerifyAccount = async (req, res) => {
    try {
        const { identifier, code } = req.body;

        if (!identifier || !code) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        let user;

        const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;

        if (emailRegex.test(identifier)) {
            user = await User.findOne({ where: { email: identifier } });
        } else {
            user = await User.findOne({ where: { username: identifier } });
        }

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "L'utilisateur n'existe pas et/ou le code est incorrect."
            });
        }

        if (code !== user.emailVerificationCode) {
            return res.status(401).json({
                error: true,
                message: "L'utilisateur n'existe pas et/ou le code est incorrect."
            });
        }

        const expirationDate = user.emailVerificationCodeExpiration;

        if (expirationDate < new Date()) {
            return res.status(401).json({
                error: true,
                message: "Le code a expiré."
            });
        }

        const userData = {
            emailVerificationCode: null,
            emailVerificationCodeExpiration: null,
            isActive: true
        }

        await user.update(userData);
        return res.status(200).json({
            error: false,
            message: "Le compte a été vérifié avec succès."
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.ResendVerification = async (req, res) => {
    try {
        const { identifier } = req.body;

        if (!identifier) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        let user;

        const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;

        if (emailRegex.test(identifier)) {
            user = await User.findOne({ where: { email: identifier } });
        } else {
            user = await User.findOne({ where: { username: identifier } });
        }

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "L'utilisateur n'existe pas et/ou le code est incorrect."
            });
        }
        // Vérifier si ça fait moins de 5 minutes
        // const expirationDate = user.emailVerificationCodeExpiration.setTime(user.emailVerificationCodeExpiration - ((5 * 60) * 1000));

        // if (expirationDate < new Date()) {
        //     return res.status(401).json({
        //         error: true,
        //         message: "Veuillez attendre 5 minutes avant d'envoyer un nouveau code."
        //     });
        // }


        // Générer un code à 6 chiffres
        const code = Math.floor(100000 + Math.random() * 900000);

        const userData = {
            emailVerificationCode: code,
            // Rajouter 15 minutes à la date actuelle
            emailVerificationCodeExpiration: new Date(Date.now() + 15 * 60 * 1000)
        }

        // Envoi de l'email de vérification
        await sendMail("accountVerification", { code: code }, user.email);

        await user.update(userData);
        return res.status(201).json({
            error: false,
            message: "Un nouveau code de vérification vient de vous être envoyé."
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.SignIn = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
        let user;
        if (emailRegex.test(identifier)) {
            user = await User.findOne({ where: { email: identifier } });
        } else {
            user = await User.findOne({ where: { username: identifier } });
        }

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "L'identifiant et/ou le mot de passe est incorrect."
            });
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: true,
                message: "L'identifiant et/ou le mot de passe est incorrect."
            });
        }

        if (!user.isActive) {
            return res.status(401).json({
                error: true,
                message: "Ce compte n'est pas activé."
            });
        }

        // Générer un token
        // Il va permettre de vérifier l'identité de l'utilisateur lors de ses requêtes vers l'API
        const token = jwt.sign({ id: user.id }, "LKKJSDFEFKONERLNERLNK", { expiresIn: "1h" });

        const userData = {
            accessToken: token,
        }

        await user.update(userData);

        return res.status(200).json({
            error: false,
            message: "Vous êtes connecté.",
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Une erreur interne est survenue, veuillez réessayer plus tard."
        });
    }
}

exports.GetProfile = async (req, res) => {
    try {
        const { id } = req.decoded;
        // console.log("TEST")

        const user = await User.findOne({ where: { id: id } });

        if (!user) {
            return res.status(404).json({
                error: true,
                message: "Utilisateur introuvable."
            });
        }

        return res.status(200).json({
            error: false,
            message: "Profil récupéré.",
            data: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: "Une erreur est survenue, veuillez réessayer plus tard."
        });
    }
}