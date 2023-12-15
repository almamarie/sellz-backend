const CustomCloudinary = require('../databases/cloudinary');
const Product = require('../models/Product.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const User = require('../models/user');
const { deleteFiles } = require('../utils/deleteFile');
const logger = require('../logs/logger');
const { areObjectsEqual } = require('../utils/compare-objects');

const cloudinary = new CustomCloudinary();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/img/new-product');
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    const id = req.body.email
      ? req.body.email.split('@')[0]
      : req.params.userId;
    cb(null, `product-${id}-${Date.now()}.${ext}`);
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

exports.postCreateProduct = catchAsync(
  async (req, res, next) => {
    logger.info('creating a new product');
    const user = req.user;
    if (!user) throw next(AppError('User Id must be provided!', 400));

    const coverPhotoPath = req.files.coverPhoto[0].path;
    const otherPhotoPaths = req.files.otherPhotos.map((photo) => photo.path);
    console.log('User prototype: ', user.Prototype);

    const coverPhoto =
      'http://res.cloudinary.com/marieloumar/image/upload/v1699385089/sellz-profile-pictures/canflknvktctez3pceyo.jpg' ||
      (await cloudinary.uploadSingleImage(coverPhotoPath));
    const otherPhotos =
      [
        'http://res.cloudinary.com/marieloumar/image/upload/v1699385120/sellz-profile-pictures/ew88dtdunx2nh8javxom.jpg',
        'http://res.cloudinary.com/marieloumar/image/upload/v1699385130/sellz-profile-pictures/xrab3lccxvoz7a8trxe5.jpg',
        'http://res.cloudinary.com/marieloumar/image/upload/v1699385155/sellz-profile-pictures/vm45ftkxaapypcdahggg.jpg',
      ] || (await cloudinary.uploadImages(otherPhotoPaths));

    // check for product categories

    if (!req.body.product) {
      next(new AppError('Product categories not provided', 404));
    }
    await user.createProduct({
      ...req.body,
      coverPhoto,
      otherPhotos: JSON.stringify(otherPhotos.join('[]')),
      productCategories: JSON.stringify(req.body.productCategories.join('[]')),
    });

    const products = await user.getProducts();

    deleteFiles([coverPhotoPath, ...otherPhotoPaths]);

    return res.status(201).send({
      success: true,
      results: products.length,
      data: { data: products.map((product) => product.format()) },
    });
  },
  (req, res) => {
    const filePaths = [
      req.files.coverPhoto[0].path,
      ...req.files.otherPhotos.map((photo) => photo.path),
    ];
    // console.log('File paths: ', filePaths);
    deleteFiles(filePaths);
  }
);

exports.getProduct = catchAsync(async (req, res, next) => {
  console.log('Get product called...');

  const product = req.product;

  res.status(200).json({
    status: 'success',
    data: {
      data: product.format(),
    },
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const user = req.user;

  const products = await user.getProducts();

  return res.status(201).send({
    success: true,
    results: products.length,
    data: { products: products.map((product) => product.format()) },
  });
});

exports.patchProduct = catchAsync(async (req, res, next) => {
  const product = req.product;

  const newProduct = await product.update({ ...req.body });

  const formatedData = newProduct.format();

  res.status(200).json({
    status: 'success',
    data: {
      data: { ...formatedData, quantityInStock: +formatedData.quantityInStock },
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const user = req.user;
  const product = req.product;

  await user.removeProduct(product);
  await product.destroy();

  console.log('Done');
  return res.status(204).json({
    status: 'success',
    data: 'null',
  });
});

exports.fetchProduct = catchAsync(async (req, res, next) => {
  const user = req.user;

  const productId = req.params.productId;
  if (!productId)
    return next(new AppError('Product ID must be provided!', 400));

  const product = await Product.findByPk(productId);
  // if (!product || !user.hasProduct(product))
  if (!product) return next(new AppError('Product not found!', 404));

  req.product = product;
  next();
});
