const mongoose = require('mongoose');

// Schema utilisé pour le model Sauces
const saucesSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true},
    heat: {type: Number, required: true},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: { type: Array, default: [], required: true },
    usersDisliked: { type: Array, default: [], required: true }
});

module.exports = mongoose.model('Sauces', saucesSchema);