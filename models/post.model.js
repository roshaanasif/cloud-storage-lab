const mongoose =require('mongoose');

const postSchema=new mongoose.Schema({

   image:{
    type:String,
    required:[true,"image is required"]
   },
   caption:{
    type:String,
    required:[true,"caption is required"]
   },
   publicId:{
      type:String,
   }

})

const postModel=mongoose.model("post",postSchema)


module.exports=postModel