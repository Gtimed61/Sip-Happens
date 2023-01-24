const stripe = require('stripe')(SK_TEST);

stripe.products.create({
  name: 'Iced Coffee',
  description: 'Iced Coffee with ',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1000,
    currency: 'usd',
    recurring: {
      interval: 'one-time',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your premium subscription price id: ' + price.id);
  });
});