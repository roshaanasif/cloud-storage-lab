const express =require('express');
const multer=require('multer')
const dotenv=require('dotenv');
dotenv.config();
const app = express();


const postRouter=require('../routers/post.routers')
// const upload=multer({storage:multer.memoryStorage()})

app.use(express.json());

app.use("/api/auth",postRouter);




module.exports=app;
