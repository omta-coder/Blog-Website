const UserCollection = require("../models/userModel");
const passport = require("passport");
const localStrategy = require("passport-local");
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
    res.render('profile',{user:req.user})
}

exports.logout = (req,res,next)=>{
    req.logout(()=>{
        res.redirect('/login')
    });
}