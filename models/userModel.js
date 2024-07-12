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
    }
},{timestamps:true});
userSchema.plugin(plm);

const UserCollection =  mongoose.model("User",userSchema);
module.exports = UserCollection;