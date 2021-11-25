const express = require('express');

const router = express.Router();  // on utilise la methode router d'express

const sauceCtrl = require('../controllers/sauceCtrl')


// route sauce
// creation sauce
router.post('/', sauceCtrl.createSauce);
// recuperer toutes les sauces
router.get('/',sauceCtrl.getAllSauces);
// recuperer une sauce
router.get('/:id', sauceCtrl.getOneSauce);
// modifier une sauces
router.put('/:id',sauceCtrl.modifySauce );
// effacer une sauce
router.delete('/:id',sauceCtrl.deleteSauce);


        
module.exports = router;
