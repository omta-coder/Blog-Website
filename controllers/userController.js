const UserCollection = require("../models/userModel");
const passport = require("passport");
const localStrategy = require("passport-local");
const BlogCollection = require("../models/blogModel");
const imagekit = require("../utils/imagekit");
const commentCollection = require("../models/commentModel");
passport.use(new localStrategy(UserCollection.authenticate()));

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const unChangableData = { username, email };
  const encriptedData = password;
  await UserCollection.register(unChangableData, encriptedData);
  res.redirect("/login");
};
(exports.login = passport.authenticate("local", {
  successRedirect: "/users/profile",
  failureRedirect: "/login",
})),
  (req, res) => {};

exports.profile = async (req, res, next) => {
  const user = await UserCollection.findById(req.user._id).populate("blogs");
  res.render("profile", { user });
};

exports.logout = (req, res, next) => {
  req.logout(() => {
    res.redirect("/login");
  });
};
exports.createBlog = async (req, res, next) => {
  const newBlog = await new BlogCollection(req.body);
  newBlog.createdBy = req.user._id;
  await newBlog.save();
  req.user.blogs.push(newBlog._id);
  await req.user.save();
  res.redirect("/users/profile");
  console.log(newBlog);
};

exports.uploadImage = async (req, res, next) => {
  try {
    const { fileId, url, thumbnailUrl } = await imagekit.upload({
      file: req.files.avatar.data,
      fileName: req.files.avatar.name,
    });
    req.user.avatar = { fileId, url, thumbnailUrl };
    await req.user.save();
    res.redirect("/users/profile");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

exports.blogUpdate = async (req, res, next) => {
  const updateblog = await BlogCollection.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  await updateblog.save();
  res.redirect("/users/profile");
};

exports.deleteBlog =async (req,res,next)=>{
    await BlogCollection.findByIdAndDelete(req.params.id);
    res.redirect("/users/profile");
}
exports.writeComment = async(req,res,next)=>{
  const newComment = await new commentCollection({
    comment: req.body.comment,
    postedBy: req.user._id,
    blogId: req.params.id
  })
 
  await newComment.save();
  const currentBlog = await BlogCollection.findByIdAndUpdate(req.params.id,{$push:{comments:newComment._id}})
  await currentBlog.save();
  res.redirect(`/blogDescription/${req.params.id}`);
 console.log(currentBlog);
}
