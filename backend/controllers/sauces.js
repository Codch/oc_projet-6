const Sauces = require('../models/Sauces');
const fs = require('fs');

// création d'une nouvelle sauce
exports.createSauces = (req, res, next) => {
    const saucesObject = JSON.parse(req.body.sauce);
    const sauces = new Sauces({
      ...saucesObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, 
      likes: 0,
      dislikes: 0,
    });
    sauces.save() 
      .then(() => res.status(201).json({message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ message: error.message }));
  };

//récupération des sauces
exports.getAllSauces = (req, res, next) => {
    Sauces.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({message: 'Cannot get sauces'}))
};

//récupération d'une sauce
exports.getOneSauce = (req, res, next) => {
  Sauces.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.deleteSauce = (req, res, next) => {
  //On trouve l'objet dans la base de données
  Sauces.findOne({ _id: req.params.id }) 
    .then(sauce => { 
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
    } else {
      //On extrait le nom du fichier à supprimer
      const filename = sauce.imageUrl.split('/images/')[1]; 
      //On supprime ce fichier (ici l'image)
      fs.unlink(`images/${filename}`, () => { 
        //Puis on supprime l'objet de la base de données
        Sauces.deleteOne({ _id: req.params.id }) 
          .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
          .catch(error => res.status(400).json({ error }));
      });
    }})
    .catch(error => res.status(500).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
      .then((sauce) => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({ message: 'Not authorized' });
          } else {
              if (req.file) {
                  // Supprimer l'ancienne image
                  const filePath = `images/${sauce.imageUrl.split('/images/')[1]}`;
                  fs.unlink(filePath, (err) => {
                      if (err) throw err;
                      console.log(`${filePath} was deleted`);
                  });
              }
              // Mettre à jour la sauce
              const sauceObject = req.file
                  ? {
                      ...JSON.parse(req.body.sauce),
                      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                  }
                  : { ...req.body };
              delete sauceObject._userId;
              Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                  .then(() => res.status(200).json({ message: 'Objet modifié!' }))
                  .catch((error) => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

// Contrôleur de la fonction like des sauces
exports.likeASauce = function (req, res, next) {
  Sauces.findOne({ _id: req.params.id })
    .then(function (likedSauce) {
      switch (req.body.like) {
        // Like = 1 => L'utilisateur aime la sauce (like = +1)
        case 1:
          if (!likedSauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
            Sauces.updateOne({ _id: req.params.id },
              {
                $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }
              })
              .then(function () {
                res.status(201).json({ message: "La sauce a été likée !" });
              })
              .catch(function (error) {
                res.status(400).json({ message: error.message });
              });
          }
          break;
        // L'utilisateur n'aime pas la sauce 
        case -1:
          if (!likedSauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
            Sauces.updateOne({ _id: req.params.id },
              { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }, }
            )
              .then(function () {
                res.status(201).json({ message: "La sauce a été dislikée !" });
              })
              .catch(function (error) {
                res.status(400).json({ message: error.message });
              });
          }
          break;
        // Annulation du like par l'utilisateur
        case 0:
          if (likedSauce.usersLiked.includes(req.body.userId)) {
            Sauces.updateOne({ _id: req.params.id },
              { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }, }
            )
              .then(function () {
                res.status(201).json({ message: "Le like de la sauce a été annulé !" });
              })
              .catch(function (error) {
                res.status(400).json({ message: error.message });
              });
          }
          // Annulation du dislike 
          if (likedSauce.usersDisliked.includes(req.body.userId)) {
            Sauces.updateOne(
              { _id: req.params.id },
              { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId }, }
            )
              .then(function () {
                res.status(201).json({ message: "Le dislike de la sauce a été annulé !" });
              })
              .catch(function (error) {
                res.status(400).json({ message: error.message });
              });
          }
          break;
      }
    })
    .catch(function (error) {
      res.status(404).json({ error: error });
    });
};