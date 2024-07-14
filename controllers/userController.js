const UserCollection = require("../models/userModel");
const passport = require("passport");
const localStrategy = require("passport-local");
const BlogCollection = require("../models/blogModel");
passport.use(new localStrategy(UserCollection.authenticate()));


exports.register = async(req,res,next)=>{
    const {username,email,password} = req.body;
    const unChangableData = {username,email}
    const encriptedData = password
    await UserCollection.register(unChangableData,encriptedData);
    res.redirect('/login')
}
exports.login = passport.authenticate("local",{
    successRedirect: "/users/profile",
    failureRedirect: "/login",
}),
(req,res)=>{}

exports.profile = async(req,res,next)=>{
    const users = await UserCollection.findById(req.user._id).populate('blogs');
    res.render('profile',{user:req.user,users})
}

exports.logout = (req,res,next)=>{
    req.logout(()=>{
        res.redirect('/login')
    });
}
exports.createBlog = async(req,res,next)=>{
    const newBlog = await new BlogCollection(req.body);
    newBlog.createdBy = req.user._id;
    await newBlog.save();
    req.user.blogs.push(newBlog._id)
    await req.user.save();
    res.redirect('/users/profile')
    console.log(newBlog);
}

exports.blogDesc = async(req,res,next)=>{
    const users = await UserCollection.findById(req.user._id).populate('blogs');
    res.render('blogdescription',{user:req.user,users});
}

