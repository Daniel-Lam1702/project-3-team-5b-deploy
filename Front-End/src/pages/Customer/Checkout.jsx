import React, { useState } from 'react';
import './Checkout.css'; // Add styles for your checkout screen

const Checkout = ({ cartItems, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePaymentSubmit = () => {
    if (paymentMethod === 'cash') {
      alert('Order placed successfully! Paid with cash.');
    } else {
      alert(`Order placed successfully! Paid with card: ${cardDetails.cardNumber}`);
    }
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.menuItem.name}</li>
          ))}
        </ul>
      </div>
      <div className="payment-methods">
        <h3>Select Payment Method</h3>
        <div>
          <label>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
            />
            Cash
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            Card
          </label>
        </div>
        {paymentMethod === 'card' && (
          <div className="card-details">
            <h4>Card Details</h4>
            <input
              type="text"
              name="name"
              placeholder="Name on Card"
              value={cardDetails.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="expiry"
              placeholder="Expiry (MM/YY)"
              value={cardDetails.expiry}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
      <div className="checkout-buttons">
        <button onClick={onBack}>Back to Cart</button>
        <button onClick={handlePaymentSubmit}>Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;
