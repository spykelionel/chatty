import cloudinary from "cloudinary";

const uploadImage = (req, res, next) => {
  if(!req.file){
    res.status(204);
  }else{
    try{
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      cloudinary.uploader.upload_stream((result) => {
        console.log(result)
        return res.status(201).json({user_avatar: result.secure_url});
      }).end(req.file.buffer);
    }catch (e) {
      console.log(`ERROR::::: ${e}`)
        res.status(500).json({status:e});
    }
  }
  next("Expected")
};

export default uploadImage;