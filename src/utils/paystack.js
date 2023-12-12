const Config = require('./config');
const PaystackLib = require('paystack');

class Paystack {
  constructor() {
    const config = new Config();
    this.paystack = new PaystackLib(config.payment.PAYMENT_SECRET_KEY);
    this.payment_config = config.payment;
  }

  async initiateTransaction(userData) {
    const response = await this.paystack.transaction.initialize({
      ...userData,
    });

    return response.data;
  }
}

module.exports = Paystack;
