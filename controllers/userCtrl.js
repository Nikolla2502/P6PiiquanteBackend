const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// recuperation du modele user 
const User = require('../models/user');

require('dotenv').config();

exports.signup = (req, res, next) => {              // creation d'un nouvel utilisateur
    bcrypt.hash(req.body.password, 10)             // on hash le mot de passe 10 fois
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({message: 'Utilisateur créé'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ message: 'Erreur reseau 0' }));
};

exports.login = (req, res ,next) => {                 // connexion d'un utilisateur existant
     user.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !'})
            }
            bcrypt.compare(req.body.password, user.password)                // bcrypt compare le password de l'utilisateur avec le password stocke dans la bdd
                .then( valid => {
                    if(!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !'});
                    }
                    res.status(200).json({
                        userId: user_id,
                        token: jwt.sign(
                            { userId: user._id },
                            TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ message: 'Erreur reseau 1' }));
        })
        .catch(error => res.status(500).json({ message: 'Reseau non trouvé ' }));
};