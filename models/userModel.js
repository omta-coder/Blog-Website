const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    avatar:{
        type:String,
        default:"https://images.unsplash.com/photo-1602542212259-720d433f8417?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog"
    }]
},{timestamps:true});
userSchema.plugin(plm);

const UserCollection =  mongoose.model("user",userSchema);
module.exports = UserCollection;