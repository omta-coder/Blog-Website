const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    comment :String,
   postedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
   },
   blogId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"blog"
   }
})
const commentCollection = mongoose.model('comment',commentSchema)
module.exports = commentCollection;