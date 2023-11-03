const logger = require('../logs/logger');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.cloudinaryImageUpload = async (path) => {
  logger.info('Uploading file...');
  // const result = await cloudinary.uploader.upload(path, {
  //   folder: process.env.CLOUDINARY_FOLDER_NAME,
  // });
  // console.dir(result, { depth: null });

  logger.info('Done uploading file...');
  // return result.url;
  return 'http://res.cloudinary.com/marieloumar/image/upload/v1698964016/sellz-profile-pictures/mynuilxrluml1e0osuua.jpg';
};
