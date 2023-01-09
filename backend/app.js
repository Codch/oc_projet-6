const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user');


mongoose.connect('mongodb+srv://codch:DVimG.r45W3LjWx@cluster0.smsa4k4.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());

app.use('/api/sauces', (req, res, next) => {
  res.status(200).json({message: 'requête reçue'})
})

app.use('/api/auth', userRoutes);

module.exports = app;