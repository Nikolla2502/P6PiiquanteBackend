const express = require('express');
const mongoose = require('mongoose');

const app = express();

// connexion au fichier d'environnement
require('dotenv').config();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// connexion MongoDB
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }) 
    .then(() => console.log('Connexion à MongoDB réussie !')) 
    .catch(() => console.log('Connexion à MongoDB échouée !'));







module.exports = app;