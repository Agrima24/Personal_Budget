const express = require('express');
const router = express.Router();
const user= require('../controllers/user');
const auth = require('../middleware/auth')


router.post('/register', user.userSignup);
router.post('/login',user.userLogin);


module.exports = router