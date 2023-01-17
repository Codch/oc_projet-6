const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Schema utilisé pour le model User
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// On applique le package sur userSchema pour que l'email soit unique
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);