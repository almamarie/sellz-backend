const express = require('express');
const paymentsController = require('../controllers/paymentsController');

const router = express.Router();

router.post('/paystack-webhook', paymentsController.verifyPaystackWebhook);

module.exports = router;
