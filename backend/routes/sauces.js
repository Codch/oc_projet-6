const express = require('express');
const saucesCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const router = express.Router();



router.post('/', auth, multer, saucesCtrl.createSauces );
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.post('/:id/like', auth, saucesCtrl.likeASauce);

// router.get('/:id',  saucesCtrl.getOneSauces);
  
//   router.put('/:id', (req, res, next) => {
//     const thing = new Thing({
//       _id: req.params.id,
//       title: req.body.title,
//       description: req.body.description,
//       imageUrl: req.body.imageUrl,
//       price: req.body.price,
//       userId: req.body.userId
//     });
//     Thing.updateOne({_id: req.params.id}, thing).then(
//       () => {
//         res.status(201).json({
//           message: 'Thing updated successfully!'
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   });
  
//   router.delete('/:id', (req, res, next) => {
//     Thing.deleteOne({_id: req.params.id}).then(
//       () => {
//         res.status(200).json({
//           message: 'Deleted!'
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   });

  module.exports = router;