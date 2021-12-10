// recuperation du modele sauce 
const Sauce = require('../models/sauce');

// declaration de 'fs' pour la gestion des fichiers image des sauces
const fs= require('fs');

// creation sauce
exports.createSauce = (req, res ,next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;        // on enleve le champs id genere du corps de la requete
    const sauce = new Sauce({
        ...sauceObject,                           // ...sauceObject premet de recuperer l'integralite du corps de la requete
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !!'}))
        .catch(error => {res.status(400).json({error})});
};

// recuperer toutes les sauces
exports.getAllSauces = (req, res, next)=> {
    Sauce.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};

// recuperer une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})  // on recupere l'id correspondant à la demande et on verifie que celui-ci correspond à l'objet demandé
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};

// modifier une sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?                                // on verifie si l'objet existe ou non
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    Sauce.findOne({  _id: req.params.id , userId: req.auth.userId  })
      .then(sauce => {
        if (!sauce) {
          res.status(404).json({error: new Error('Objet non trouvé !')});
        }
        if (sauce.userId !== req.auth.userId) {
          return res.status(401).json({error: new Error('Requête non autorisée !')});
        }
        Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
          .then(() => res.status(200).json({ message: 'Sauce modifiée '}))
          .catch(error => res.status(400).json({error}));
      })    
      .catch(error => res.status(500).json({error}));
};

// effacer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({  _id: req.params.id , userId: req.auth.userId  })
      .then(sauce => {
        if (!sauce) {
          res.status(404).json({error: new Error('Objet non trouvé !')});
        }
        if (sauce.userId !== req.auth.userId) {
          return res.status(401).json({error: new Error('Requête non autorisée !')});
        }
        const filename = sauce.imageUrl.split('/images')[1];
        fs.unlink(`images/${filename}`, () => {                // une fois que le fichier est supprimé on supprime la sauce
          sauce.deleteOne({ _id: req.params.id })
          .then(() => {res.status(200).json({message: 'Votre sauce a été supprimée'})})
          
          .catch((error) => {res.status(400).json({error: error})});
        });  
      })
      .catch(error => res.status(500).json({ error }));
};

// user like dislike
exports.userLikeSauce = (req, res, next) => {

    let like = req.body.like //Initialiser le statut Like
    let userId = req.body.userId //Recuperation de userId
    let sauceId = req.params.id //Récupération de la sauce
  //Si l'utilisateur like
    if (like === 1) { 
      Sauce.updateOne(
        {_id: sauceId}, 
        {
            $push: {usersLiked : userId},
            $inc: {likes: +1}
        }) 
  
        .then(() => res.status(200).json({ message: 'Vous aimez cette sauce !!!'}))
        .catch(error => res.status(400).json({ error }));
    }
   //Si l'utilisateur Dislike
    if (like === -1) {
      Sauce.updateOne(
        {_id: sauceId}, 
        { 
            $push: {usersDisliked : userId}, 
            $inc: {dislikes: +1}
        })
  
        .then(() => res.status(200).json({ message: 'Vous n\'aimez pas cette sauce !!!'}))
        .catch(error => res.status(400).json({ error }));
    }
    //Annulation d'un like ou dislike
    if (like === 0) { 
      Sauce.findOne({_id: sauceId})  
        .then((sauce) => {
          //Si l'utilisateur annule un like
          if (sauce.usersLiked.find(user => user === userId)) { 
            Sauce.updateOne(
              {_id: sauceId},
              { $pull: { usersLiked: userId},
                $inc: { likes: -1 }
              })
  
              .then(() => res.status(200).json({ message: 'Votre avis a été annulé'}))
              .catch(error => res.status(400).json({ error }));
          }
          //Si l'utilisateur annule un dislike
          if(sauce.usersDisliked.find(user => user === userId)) { 
            Sauce.updateOne(
              {_id: sauceId},
              { $pull: { usersDisliked: userId},
                $inc: { dislikes: -1 }
              })
  
              .then(() => res.status(200).json({ message: 'Votre avis a été annulé'}))
              .catch(error => res.status(400).json({ error }));
          }
  
        })
        .catch((error) => res.status(404).json({ error }))
  
    }
  
  };