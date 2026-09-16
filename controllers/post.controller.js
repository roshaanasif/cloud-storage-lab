const multer=require('multer');
const upload=multer({storage:multer.memoryStorage()})
const postModel=require('../models/post.model');
// const uploadFile=require("../services/storage.service")
const {uploadFile,deleteFile}=require("../services/cloudinaryStorage.service")


exports.createPost = [
    upload.single("image"),
    async (req, res) => {
        console.log(req.body);
        console.log(req.file);

       const result= await uploadFile(req.file.buffer)

       const post=await postModel.create({
        image:result.secure_url,
        caption:req.body.caption,
        publicId:result.public_id
       })
       

       console.log(post)

    res.status(201).json({
        message:"post created successfully",
        post
    })


    }
];

exports.deletePost=async(req,res)=>{

    const id = req.params.id;

    const post=await postModel.findOne({_id:id});

    if(!post){
        return res.status(404).json({
        message:"post not found"
    }) 
    }

    if(!post.publicId){
        return res.status(404).json({
        message:"post id not found"
    }) 
    }

  const deletePictureFromCloudinary=await deleteFile(post.publicId)

  
    if(!deletePictureFromCloudinary){
        return res.status(40).json({
        message:"cloudinary error deleting post"
    }) 
    }
 
  if(deletePictureFromCloudinary){
    const deletePostFromDB=await postModel.findOneAndDelete(id)
  }
 

    res.status(200).json({
        message:"post deleted successfully",
        post
    })

}

exports.updatePost=[
   upload.single("image"),
    async(req,res)=>{
        
    const id =req.params.id;
    const caption=req.body.caption;
    const file=req.file;

    const post=await postModel.findOne({_id:id});

    if(!post){
        return res.status(404).json({
        message:"post not found"
    }) 
    }

    if(!post.publicId){
        return res.status(404).json({
        message:"post id not found"
    }) 
    }

    const deletePost=await deleteFile(post.publicId)

    if(!deletePost){
        return res.status(404).json({
        message:"Error updating cloudinary url"
    }) 
    }

    if(file){
        const newPostPicture=await uploadFile(file.buffer)
        post.image=newPostPicture.secure_url;
        post.publicId=newPostPicture.public_id;
    }

    if(caption){
        post.caption=caption
    }


    await post.save()



    res.status(201).json({
            message:"post updated successfully",
            post
        }) 

}
]


exports.allPosts=async(req,res)=>{

    const posts=await postModel.find();


    res.status(200).json({
        message:"posts fetched successfully",
        posts
    })
}