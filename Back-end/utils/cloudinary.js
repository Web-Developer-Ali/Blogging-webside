import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (buffer) => {
    try {
        if (!buffer) return null;
        // Upload the buffer to Cloudinary
        const response = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
            uploadStream.end(buffer);
        });
       return response;

    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
};

const deleteFromCloudinary = async (publicId) => {
    console.log(publicId);
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
    }
};

export { uploadOnCloudinary, deleteFromCloudinary };
