const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// recuperation du modele user 
const User = require('../models/user');

// declaration de dotenv pour la recuperation des donnees 'token' du fichier .env
require('dotenv').config();

 // creation d'un nouvel utilisateur
exports.signup = (req, res, next) => {           
    bcrypt.hash(req.body.password, 10)      // on hash le mot de passe 10 fois
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(()=> res.status(201).json({message: 'Utilisateur créé  !' }))
            .catch(error => res.status(400).json({ error: 'Mot de passe non conforme !' }))
    })
    .catch(error => res.status(500).json({ error }));
};

// connexion d'un utilisateur existant
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({error: 'Utilisateur non trouvé'});
        }
        bcrypt.compare(req.body.password, user.password)         // bcrypt compare le password de l'utilisateur avec le password stocke dans la bdd
        .then(valid => {
            if (!valid) {
                return res.status(401).json({error: 'Mot de passe Incorrect'});
            }
            res.status(200).json({
                userId: user._id,
                token:jwt.sign({ userId: user._id },
                process.env.TOKEN,
                { expiresIn: '24h'}
                )
            });
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};