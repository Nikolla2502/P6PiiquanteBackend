const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/userCtrl');
const passwordValidator = require('../middleware/passwordValidator');

router.post('/signup',passwordValidator, userCtrl.signup);
router.post('/login',passwordValidator, userCtrl.login);

module.exports = router;