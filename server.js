require('dotenv').config();
const sequelize = require('./src/databases/sequelize');
const User = require('./src/models/user');
const logger = require('./src/logs/logger');

const Product = require('./src/models/Product.model');
const ProductCategory = require('./src/models/ProductCategory.model');
const ProductCondition = require('./src/models/ProductCondition.model');
const ProductReview = require('./src/models/ProductReview.model');
const Cart = require('./src/models/Cart.model');
const CartItem = require('./src/models/CartItem.model');
const Order = require('./src/models/Order.model');
const OrderItem = require('./src/models/OrderItem.model');
const Shipper = require('./src/models/Shipper.model');

const app = require('./src/app.js');
const PORT = process.env.PORT;
User.hasMany(Product, { foreignKey: 'userId' });
Product.hasOne(User);

Product.hasMany(ProductReview);
Product.hasOne(ProductCategory);
Product.hasOne(ProductCondition);

User.hasOne(Cart);
Cart.hasOne(User);

Product.belongsToMany(Cart, { through: CartItem });
Product.belongsToMany(Order, { through: OrderItem });

Product.hasOne(Shipper);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    logger.info('Database connected.');
    app.listen(PORT, () => {
      logger.info(`server running at port: ${PORT}`);
      logger.info('Press CTRL + C to stop server');
    });
  });
