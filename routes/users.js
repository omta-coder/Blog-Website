var express = require("express");
const {
  register,
  login,
  profile,
  logout,
  createBlog,
  uploadImage,
  blogUpdate,
  deleteBlog,
} = require("../controllers/userController");
const { isLoggedIn } = require("../middleware/auth");
const imagekit = require("../utils/imagekit");
const BlogCollection = require("../models/blogModel");
var router = express.Router();

/* GET users listing. */
router.post("/register", register);
router.post("/login", login);
router.get("/profile", isLoggedIn, profile);
router.get("/logout", isLoggedIn, logout);
router.post("/create", isLoggedIn, createBlog);
router.post("/imageUpload/:id", isLoggedIn, uploadImage);
router.get("/updateblog/:id", isLoggedIn, async (req, res, next) => {
  const currentblog = await BlogCollection.findById(req.params.id);
  res.render("updateblog", { user: req.user, currentblog });
});
router.post("/updateblog/:id", isLoggedIn, blogUpdate);
router.get("/delete/:id", isLoggedIn,deleteBlog);

module.exports = router;
