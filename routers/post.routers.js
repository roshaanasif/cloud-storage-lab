const express=require('express');

const postrouter=express.Router();

const postController=require('../controllers/post.controller')


postrouter.post("/create-post",postController.createPost)
postrouter.get("/all-posts",postController.allPosts)

module.exports=postrouter;