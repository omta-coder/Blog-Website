var express = require('express');
const BlogCollection = require('../models/blogModel');
const { isLoggedIn } = require('../middleware/auth');
const UserCollection = require('../models/userModel');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const allBlogs = await BlogCollection.find()
  res.render('index', { title: 'Express',user:req.user,allBlogs });
});
router.get('/create',isLoggedIn, function(req, res, next) {
  res.render('createBlog', { title: 'Express',user:req.user  });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express',user:req.user  });
});
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express',user:req.user  });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' ,user:req.user });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' ,user:req.user });
});
router.get('/blogDescription/:id',async function(req, res, next) {
  const allusers = await UserCollection.find()
  const blogs = await BlogCollection.find().populate('createdBy');
  const blogdescriptions = await BlogCollection.findById(req.params.id).populate({
    path:'comments',
    model:'comment',
    populate:{path:'postedBy',model:'user'}
  }).exec()
  res.render('blogdescription', { title: 'Express', allusers,user:req.user,blogdescriptions,blogs });
});


module.exports = router;
