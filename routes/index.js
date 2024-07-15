var express = require('express');
const BlogCollection = require('../models/blogModel');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  const allBlogs = await BlogCollection.find()
  res.render('index', { title: 'Express',user:req.user,allBlogs });
});
router.get('/create', function(req, res, next) {
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


module.exports = router;
