const express = require('express');
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const router = express.Router();


// Création des routes sauces avec ajout de auth pour authentifier les accès et multer quand la gestion d'image est nécessaire
router.post('/', auth, multer, saucesCtrl.createSauces );
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.post('/:id/like', auth, saucesCtrl.likeASauce);


  module.exports = router;