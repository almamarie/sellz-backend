require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { IndexRouter } = require("./src/routes/index.router");
const sequelize = require("./src/databases/sequelize");
const User = require("./src/models/user");
const logger = require("./src/utils/logger");

const V0MODELS = require("./src/models/models.index");
const Product = require("./src/models/Product.model");
const ProductCategory = require("./src/models/ProductCategory.model");
const ProductCondition = require("./src/models/ProductCondition.model");
const ProductReview = require("./src/models/ProductReview.model");
const Cart = require("./src/models/Cart.model");
const CartItem = require("./src/models/CartItem.model");
const Order = require("./src/models/Order.model");
const OrderItem = require("./src/models/OrderItem.model");
const Shipper = require("./src/models/Shipper.model");

(async () => {
  const app = express();
  const PORT = process.env.PORT || 8080;
  app.use(bodyParser.json());
  //   sequelize.addModels(V0MODELS);

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, body"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    next();
  });

  app.use("/api/v0", IndexRouter);

  User.hasMany(Product);
  Product.hasMany(ProductReview);
  Product.hasOne(ProductCategory);
  Product.hasOne(ProductCondition);

  User.hasOne(Cart);
  Product.belongsToMany(Cart, { through: CartItem });
  Product.belongsToMany(Order, { through: OrderItem });

  Product.hasOne(Shipper);

  sequelize
    .sync()
    // .sync({ force: true })
    .then(() => {
      app.listen(PORT, () => {
        logger.info(`server running at port: ${PORT}`);
        logger.info("Press CTRL + C to stop server");

        // ProductCondition.create({ name: "slightly used" });
        // ProductCondition.create({ name: "used" });
        // ProductCondition.create({ name: "Brand new" });

        // ProductCondition.create({})
      });
    });
})();
