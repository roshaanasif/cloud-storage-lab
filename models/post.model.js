const mongoose =require('mongoose');

const postSchema=new mongoose.Schema({

   image:{
    type:String,
    required:[true,"image is required"]
   },
   caption:{
    type:String,
    required:[true,"caption is required"]
   }

})

const postModel=mongoose.model("post",postSchema)


module.exports=postModel