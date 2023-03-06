const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');


// Routes des connexions et créations de compte vers l'API
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);



module.exports = router;