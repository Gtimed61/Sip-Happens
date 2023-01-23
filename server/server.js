const stripe = require('stripe')('sk_test_51MS9LnLPqkfbw31McDXZ7mjsVzdASliF9TPIw3ArHBHHbOUE6ZaAbBiLrnuU1uALKeNEVjaSu2tmhZjzDaMxq3aX00csRD77XI');
const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1MS9xdLPqkfbw31MOKlmgmrU',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${PORT}?success=true`,
    cancel_url: `${PORT}?canceled=true`,
  });
  res.redirect(303, session.url);
});

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
