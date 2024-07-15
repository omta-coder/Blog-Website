var express = require('express');
const { register, login, profile, logout, createBlog, blogDesc, uploadImage } = require('../controllers/userController');
const { isLoggedIn } = require('../middleware/auth');
const imagekit = require('../utils/imagekit');
var router = express.Router();

/* GET users listing. */
router.post('/register',register);           
router.post('/login',login);
router.get('/profile',isLoggedIn,profile);
router.get('/logout',isLoggedIn,logout);
router.post('/create',isLoggedIn,createBlog)
router.get('/blogDescription/:id',isLoggedIn,blogDesc)
router.post('/imageUpload/:id',isLoggedIn,uploadImage)




module.exports = router;
