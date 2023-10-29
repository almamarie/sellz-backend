const ProductCategory = require("./ProductCategory.model");
const ProductCondition = require("./ProductCondition.model");
const Product = require("./Product.model");
const ProductReview = require("./ProductReview.model");
const Cart = require("./Cart.model");
const CartItem = require("./CartItem.model");
const User = require("./user");
const Order = require("./Order.model");
const OrderItem = require("./OrderItem.model");
const Shipper = require("./Shipper.model");

const V0MODELS = [
  User,
  Product,
  ProductCategory,
  ProductReview,
  ProductCondition,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Shipper,
];

exports.V0MODELS = V0MODELS;
