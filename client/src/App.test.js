import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm"

const stripePromise = loadStripe('SK_TEST');

const App = () => {
  return (
    <div className="App">
      <div className="product">
        <img
          src="/assets/strapi-images/Caffè_Espresso_Macchiato_Schiumato.jpg"
          alt="Espresso Coffee"
        />
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default App;