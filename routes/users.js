var express = require('express');
const { register, login, profile, logout, createBlog, blogDesc } = require('../controllers/userController');
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
router.post('/imageUpload/:id',isLoggedIn,async(req,res,next)=>{
  try {
     const {fileId, url, thumbnailUrl} = await imagekit.upload({
      file: req.files.avatar.data,
      fileName: req.files.avatar.name,
     })
     req.user.avatar = {fileId, url, thumbnailUrl}
     await req.user.save()
     res.redirect("/users/profile")
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }

})




module.exports = router;
