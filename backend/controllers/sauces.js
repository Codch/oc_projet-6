const Sauces = require('../models/Sauces');

exports.createSauces = (req, res, next) => {
    console.log(req.body.sauce)
    const saucesObject = JSON.parse(req.body.sauce);
    console.log(saucesObject)
    delete saucesObject._id;
    delete saucesObject.userId;
    const sauces = new Sauces({
      ...saucesObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(sauces)
    sauces.save()
      .then(() => res.status(201).json({message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({message: 'Objet manquant' }));
  };

exports.getSauces = (req, res, next) => {
    Sauces.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({message: 'Cannot get sauces'}))
};