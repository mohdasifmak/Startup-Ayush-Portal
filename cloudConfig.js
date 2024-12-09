require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');



// console.log(process.env.CLOUD_API_KEY);

// console.log(process.env.CLOUD_NAME);

// console.log(process.env.CLOUD_API_SECRET);


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


//console.log(cloudinary.config());



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'startup-ayush-portal',
      allowed_formats: ["png", "jpg", "jpeg"]
    },
});



module.exports  = {
    cloudinary,
    storage,
}