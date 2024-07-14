var express = require('express');
const { register, login, profile, logout, createBlog, blogDesc } = require('../controllers/userController');
const { isLoggedIn } = require('../middleware/auth');
var router = express.Router();


/* GET users listing. */
router.post('/register',register);
router.post('/login',login);
router.get('/profile',isLoggedIn,profile);
router.get('/logout',isLoggedIn,logout);
router.post('/create',isLoggedIn,createBlog)
router.get('/blogDescription/:id',isLoggedIn,blogDesc)



module.exports = router;
