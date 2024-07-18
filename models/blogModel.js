const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: String,
    description:String,
    url:String,
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
   comments:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }
   ]
},{timestamps:true})

const BlogCollection = mongoose.model("blog",blogSchema)
module.exports = BlogCollection;