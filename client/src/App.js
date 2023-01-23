import React, { useState, useEffect } from "react";
import './App.css';

const ProductDisplay = () => (
  <section>
    <div className="product">
      <img 
        src=""
        alt=""
      />
      <div className="description">
        <h3>Coffee</h3>
        <h5>$10.00</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.');
    }
    if (query.get('canceled')) {
      setMessage('Order canceled -- continue to shop around and checkout when you are ready.');
    }
  }, []);
  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}
