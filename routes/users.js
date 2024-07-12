var express = require('express');
const { register, login, profile, logout } = require('../controllers/userController');
const { isLoggedIn } = require('../middleware/auth');
var router = express.Router();


/* GET users listing. */
router.post('/register',register);
router.post('/login',login);
router.get('/profile',isLoggedIn,profile);
router.get('/logout',isLoggedIn,logout);

module.exports = router;
