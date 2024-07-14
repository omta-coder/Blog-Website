var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',user:req.user });
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
