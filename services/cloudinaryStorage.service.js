const cloudinary=require("cloudinary").v2;


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const uploadFile=async(buffer)=>{
   
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "postify",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(buffer);
      console.log("result:",stream)
    });

    console.log("result:",result)
    return result
}

const deleteFile=async(public_id)=>{
   
    const result = await cloudinary.uploader.destroy(public_id)
       

    console.log("result:",result)
    return result
}


module.exports={uploadFile,deleteFile}