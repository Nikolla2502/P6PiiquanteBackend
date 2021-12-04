const express = require('express');

const router = express.Router();  // on utilise la methode router d'express

const sauceCtrl = require('../controllers/sauceCtrl');
const auth = require ('../middleware/auth');

// routes sauce
// creation sauce
router.post('/', auth, sauceCtrl.createSauce);
// recuperer toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);
// recuperer une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);
// modifier une sauces
router.put('/:id', auth, sauceCtrl.modifySauce );
// effacer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);


        
module.exports = router;
