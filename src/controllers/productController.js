const CustomCloudinary = require('../databases/cloudinary');
const Product = require('../models/Product.model');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const { generateId } = require('../utils/generateId');

const cloudinary = new CustomCloudinary();
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/img/new-user');
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const id = req.body.email
      ? req.body.email.split('@')[0]
      : req.params.userId;
    cb(null, `user-${id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadProductImages = upload.fields([
  { name: 'coverPhoto', maxCount: 1 },
  { name: 'otherPhotos', maxCount: 5 },
]);

exports.postCreateProduct = catchAsync(async (req, res, next) => {
  const user = req.user;

  const coverPhotoPath = req.files.coverPhoto[0].path;
  const otherPhotoPaths = req.files.otherPhotos.map((photo) => photo.path);

  const coverPhoto =
    'here' || (await cloudinary.uploadSingleImage(coverPhotoPath));
  const otherPhotos =
    ['here'] || (await cloudinary.uploadImages(otherPhotoPaths));

  const productId = generateId();
  const newProduct = await Product.create({
    productId,
    ...req.body,
    coverPhoto,
    otherPhotos: JSON.stringify(otherPhotos.join('[]')),
  });

  await user.addProduct(newProduct);

  const products = await user.getProducts();
  return res.status(201).send({
    success: true,
    results: products.length,
    data: { products: products.map((product) => product.format()) },
  });
});

exports.getProduct = factory.getOne(Product);
