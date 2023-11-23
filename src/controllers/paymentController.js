const catchAsync = require('../utils/catchAsync');

exports.postMakePayment = catchAsync(async (req, res, next) => {
  const data = req.body;

  return res.status(201).send({
    success: true,
    data: { products: products.map((product) => product.format()) },
  });
});
