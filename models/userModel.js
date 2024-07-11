const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});
userSchema.plugin(plm);

const UserCollection =  mongoose.model("User",userSchema);
module.exports = UserCollection;