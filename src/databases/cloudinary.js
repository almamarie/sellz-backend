const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.cloudinaryImageUpload = async (path) => {
  console.log("Here now: ", path);
  const result = await cloudinary.uploader.upload(path, {
    folder: process.env.CLOUDINARY_FOLDER_NAME,
  });
  console.dir(result, { depth: null });

  return result.url;
};
