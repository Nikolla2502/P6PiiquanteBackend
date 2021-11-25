const express = require('express');

const router = express.Router();  // on utilise la methode router d'express


// recuperation du modele sauce 
const sauce = require('../models/sauce');

// route sauce
// creation sauce
router.post('/',(req,res,next) => {
    delete req.body._id;        // on enleve le champs id genere par mongodb du corps de la requete
    const sauce = new sauce({
        ...req.body           // ...req.body premet de recuperer l'integralite du corps de la requete
    })
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
    .catch(error => res.status(400).json({ error}));
});

// recuperer toutes les sauces
router.get('/',(req,res,next) => {
    sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error =>res.status(400).json({ error}));
});

// recuperer une sauces
router.get('/:id', (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
    });

// modifier une sauces
router.put('/:id', (req, res, next) => {
    sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
    });

// effacer une sauce
router.delete('/:id', (req, res, next) => {
    sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
    .catch(error => res.status(400).json({ error }));
        });


        
module.exports = router;
