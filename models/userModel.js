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
        fileId: String,
        url: String,
        thumbnailUrl: String,
    },
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog"
    }]
},{timestamps:true});
userSchema.plugin(plm);

const UserCollection =  mongoose.model("user",userSchema);
module.exports = UserCollection;