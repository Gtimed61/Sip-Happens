const stripe = require('stripe')('sk_test_51MS9LnLPqkfbw31McDXZ7mjsVzdASliF9TPIw3ArHBHHbOUE6ZaAbBiLrnuU1uALKeNEVjaSu2tmhZjzDaMxq3aX00csRD77XI');

stripe.products.create({
  name: 'Iced Coffee',
  description: 'Iced Coffee with ',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1200,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your premium subscription price id: ' + price.id);
  });
});