const mongoose = require('mongoose');

const saucesSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String},
    heat: {type: Number, required: true},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: { type: Array, default: [], required: true },
    usersDisliked: { type: Array, default: [], required: true }
});

module.exports = mongoose.model('Sauces', saucesSchema);