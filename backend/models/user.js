const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// Création d'un schéma d'utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


// Utilisation d'uniqueValidator pour utiliser qu'une seule adresse e-mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);