const catchAsync = require('../utils/catchAsync');
const factoryController = require('./handlerFactory');
const ProductCategory = require('../models/ProductCategory.model');
// Create product category
exports.postCreate = factoryController.postCreate(ProductCategory);

// Get product category
exports.getAll = factoryController.getAll(ProductCategory);

// Get product category

// Update product category

// delete product category
