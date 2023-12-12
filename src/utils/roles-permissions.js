const permissions = {
  superadmin: [
    // product category
    'post:product-category',
    'get:product-category',
    'patch:product-category',
    'delete:product-category',

    // product condition
    'post:product-condition',
    'get:product-condition',
    'patch:product-condition',
    'delete:product-condition',

    // Shipper
    'post:shipper',
    'get:shipper',
    'patch:shipper',
    'delete:shipper',

    // admin
    'create:admin',
    'get:admin-user',
    'patch:admin-user',
    'delete:admin-user',
  ],

  admin: [
    // user
    'create:user',
    'get:user',
    'patch:user',
    'delete:user',

    // user order
    'cancel:order',
  ],

  user: [
    // product
    'post:product',
    'get:product',
    'get:products',
    'patch:product',
    'delete:product',

    // Order
    'post:order',
    'get:order',

    // cart
    'post:add-cart-item',
    'get:cart',
    'update:cart',
    'delete:delete-cart-item',
  ],
};
exports.permissions = permissions;
exports.roles = Object.keys(permissions);
