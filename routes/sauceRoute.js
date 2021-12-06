const express = require('express');

const router = express.Router();  // on utilise la methode router d'express

const sauceCtrl = require('../controllers/sauceCtrl');
const auth = require ('../middleware/auth');
const multer = require('../middleware/multer-config');

// routes sauce
// creation sauce
router.post('/', auth, multer, sauceCtrl.createSauce);
// recuperer toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);
// recuperer une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);
// modifier une sauces
router.put('/:id', auth, multer, sauceCtrl.modifySauce );
// effacer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// like dislike
router.post("/:id/like", auth, sauceCtrl.userLikeSauce);

        
module.exports = router;
