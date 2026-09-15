const mongoose=require('mongoose');

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI)

        console.log("mongoDb connected successfully")
    }catch(err){
        console.log("connection  failed",err)
    }
}


module.exports=connectDB;