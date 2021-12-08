exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id, userId: req.auth.userId })
      .then(sauce => {
        if (!sauce) {
          res.status(404).json({error: new Error('Objet non trouvé !')});
        }
        if (sauce.userId !== req.auth.userId) {
          return res.status(401).json({error: new Error('Requête non autorisée !')});
        }
        
        const filename = sauce.imageUrl.split('/images')[1];
        fs.unlink(`images/${filename}`, () => {                // une fois que le fichier est supprimé on supprime la sauce
            res.status(500).json({ message: 'test' });
            sauce.deleteOne({ _id: req.params.id })
            .then(() => { res.status(200).json({message: 'Deleted!'})})
            .catch((error) => { res.status(400).json({ message: 'Erreur reseau 1!' })});
        
      })
      .catch(error => res.status(500).json({ message: 'Erreur reseau 0!' }));
      })
    };