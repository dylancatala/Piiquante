const mongoose = require('mongoose');


//Creating an unique schema of Sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, defaut: 0 },
  likes: { type: Number },
  dislikes: { type: Number, defaut: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

module.exports = mongoose.model('Sauce', sauceSchema);