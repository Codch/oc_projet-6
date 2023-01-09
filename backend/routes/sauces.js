const express = require('express');
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const router = express.Router();



router.post('/',auth, multer, saucesCtrl.createSauces );
router.get('/',auth, saucesCtrl.getSauces);

  module.exports = router;