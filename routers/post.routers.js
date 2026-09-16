const express=require('express');

const postrouter=express.Router();

const postController=require('../controllers/post.controller')


postrouter.post("/create-post",postController.createPost)
postrouter.delete("/delete-post/:id",postController.deletePost)
postrouter.put("/update-post/:id",postController.updatePost)
postrouter.get("/all-posts",postController.allPosts)

module.exports=postrouter;