// recuperation du modele sauce 
const sauce = require('../models/sauce');

// creation sauce
exports.createSauce = (req,res,next) => {
    delete req.body._id;        // on enleve le champs id genere par mongodb du corps de la requete
    const sauce = new sauce({
        ...req.body           // ...req.body premet de recuperer l'integralite du corps de la requete
    })
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
    .catch(error => res.status(400).json({ error}));
}; 

// recuperer toutes les sauces
exports.getAllSauces = (req,res,next) => {
    sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error =>res.status(400).json({ error}));
};

// recuperer une sauces
exports.getOneSauce = (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
    };

// modifier une sauce
exports.modifySauce = (req, res, next) => {
    sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
    }

// effacer une sauce
exports.deleteSauce = (req, res, next) => {
    sauce.findOne({ _id: req.params.id }) 
        .then((sauce) => {
        if (!sauce) {
            res.status(404).json({error: new Error('Objet non trouvé !')});
        }
        if (sauce.userId !== req.auth.userId) {
            return res.status(401).json({error: new Error('Requête non autorisée !')});
        }
        sauce.deleteOne({ _id: req.params.id })
            .then(() => {res.status(200).json({message: 'Deleted!'})
            })
            .catch((error) => {res.status(400).json({error: error})});
        }
        )
};