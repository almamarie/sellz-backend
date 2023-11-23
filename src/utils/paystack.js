class Paystack {
  constructor() {}

  initiateTransaction(userData) {
    const url = 'https://api.paystack.co/transaction/initialize';
    const params = {
      email: 'customer@email.com',
      amount: '20000',
    };

    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer SECRET_KEY',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
  }
}
