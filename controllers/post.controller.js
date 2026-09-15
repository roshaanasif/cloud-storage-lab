const multer=require('multer');
const upload=multer({storage:multer.memoryStorage()})
const postModel=require('../models/post.model');
const uploadFile=require("../services/storage.service")


exports.createPost = [
    upload.single("image"),
    async (req, res) => {
        console.log(req.body);
        console.log(req.file);


       const result= await uploadFile(req.file.buffer)

       const post=await postModel.create({
        image:result.url,
        caption:req.body.caption
       })
       

       console.log(post)

    res.status(201).json({
        message:"post created successfully",
        post
    })


    }
];


exports.allPosts=async(req,res)=>{

    const posts=await postModel.find();


    res.status(200).json({
        message:"posts fetched successfully",
        posts
    })
}