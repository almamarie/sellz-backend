const logger = require('../logs/logger');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { generateId } = require('../utils/generateId');
const Paystack = require('../utils/paystack');
const crypto = require('crypto');
const Config = require('../utils/config');

const config = new Config();
const payment = new Paystack();

exports.verifyPaystackWebhook = catchAsync(async (req, _, next) => {
  if (!verifyIp(req, next)) return next(new AppError('Unauthorised IP', 401));
  if (!verifySignature(req, next))
    return next(new AppError('Invalid signature', 401));
  logger.info('Done verifying paystack webhook req.');
  next();
});

const verifyIp = (req, next) => {
  logger.info('verifying paystack ip address...');

  const whitelistIp = ['52.31.139.75', '52.49.173.169', '52.214.14.220', '::1']; // TODO Remove the ::1 IP from the list
  const reqIp = req.ip;
  console.log(reqIp);
  return whitelistIp.includes(reqIp);
};

const verifySignature = (req, next) => {
  logger.info('verifying paystack webhook signature...');

  const hash = crypto
    .createHmac('sha512', config.payment.PAYMENT_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');
  return hash === req.headers['x-paystack-signature'];
};

exports.postInitiatePayment = catchAsync(async (req, res, _) => {
  const data = req.body;
  const paymentId = generateId();
  const paymentInitData = await payment.initiateTransaction({
    email: data.email,
    amount: data.amount,
    name: data.name,
    callback_url: data.callback_url,
    reference: paymentId,
  });
  return res.status(201).send({
    success: true,
    data: { data: { ...paymentInitData } },
  });
});

exports.paymentWebhook = catchAsync((req, res, next) => {
  logger.info('paystack webhook called.');
  const body = req.body;
  console.log('body');
  res.send(200);
});
