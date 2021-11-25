const express = require('express');
const app = express();
const mongoose = require('mongoose');

const sauce = require('./models/sauce');



// connexion au fichier d'environnement
require('dotenv').config();

// connexion MongoDB
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }) 
    .then(() => console.log('Connexion à MongoDB réussie !')) 
    .catch(() => console.log('Connexion à MongoDB échouée !'));




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});    

app.post('/api/sauce',(req,res,next) => {
    delete req.body._id;        // on enleve le champs id genere par mongodb du corps de la requete
    const sauce = new sauce({
        ...req.body           // ...req.body premet de recuperer l'integralite du corps de la requete
    })
    sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
    .catch(error => res.status(400).json({ error}));
});
app.use('/api/sauce',(req,res,next) => {
    sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error =>res.status(400).json({ error}));
});
app.get('/api/sauce/:id', (req, res, next) => {
    sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
    });

app.put('/api/sauce/:id', (req, res, next) => {
    sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
    });


module.exports = app;