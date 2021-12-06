const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
email: { 
    type: String, 
    required: true, 
    unique: true                    // l'utilisateur est unique avec son adresse mail
},
password: { 
    type: String, 
    required: true 
}
});

userSchema.plugin(uniqueValidator);           // on utilise unique-validator dans le schema avant de l'exporter

module.exports = mongoose.model('User', userSchema);



