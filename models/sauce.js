const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userId: {                     // identifiant user 
    type: String, 
    required: true 
  },     
  name:   {                    // nom de la sauce
     type: String,
     required: true 
  },     
  manufacturer: {              // fabricant de la sauce
    type: String,
    required: true
  },  
  description: {              // description de la sauce
     type: String,
     required: true
  },  
  mainPepper: {               //principal ingrédient épicé de la sauce
    type: String,
    required:true
  },    
  imageUrl: {                 //l'URL de l'image de la sauce téléchargée par l'utilisateur
     type: String,
     required: true
  },   
  heat: {                    //nombre entre 1 et 10 décrivant la sauce
    type: Number,
    required:true
  },    
  likes: {                  //nombre d'utilisateurs qui aiment (= likent) la sauce
    type: Number,
    required: true,
    default: 0
  },  
  dislikes:{type:Number,    //nombre d'utilisateurs qui n'aiment pas (= dislike) la sauce
    required:true,
    default: 0
  },    
  usersLiked:{              //tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce   [ "String <userId>" ]
    type: Array,
    required:true,
    default: []
  },
  usersDisliked:{           //tableau des identifiants des utilisateurs qui n'ont pas aimé (= disliked) la sauce   [ "String <userId>" ]
    type: Array,
    required:true,
    default: []
  },  
});

module.exports = mongoose.model('Sauce', sauceSchema);