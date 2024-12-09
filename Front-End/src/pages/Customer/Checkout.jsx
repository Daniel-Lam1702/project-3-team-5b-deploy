import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccessibilityButton } from '../../components/Accessibility/AccessibilityButton';
import './Checkout.css'; // Add styles for your checkout screen

/**
 * `Checkout` component allows the user to review their order, select a payment method, 
 * and submit the payment for the order. The payment method can either be cash or card.
 * If the payment method is card, users are required to input card details.
 * 
 * Props:
 * @param {boolean} isPage - A flag indicating whether this component is displayed as a standalone page.
 *                           If `true`, additional elements like navigation controls may be rendered.
 * @param {Array} cartItems - List of items in the cart to be displayed in the order summary. Each item 
 *                            includes details about the menu item, quantity, and selected components.
 * @param {Function} onBack - Function to navigate back to the cart or previous page.
 * 
 * Features:
 * - Displays an order summary with all items in the cart.
 * - Allows users to choose a payment method (cash or card).
 * - If the card is selected, prompts for card details like card number, expiration date, and CVV.
 * - Provides a confirmation button to submit the order after reviewing and selecting payment details.
 * - Supports navigating back to the previous screen or cart using the `onBack` prop.
 * 
 * Example usage:
 * ```
 * const cartItems = [{ menuItem: { name: 'Burger' } }];
 * 
 * return <Checkout isPage={true} cartItems={cartItems} onBack={() => {}} />;
 * ```
 * 
 * @component
 * @returns {JSX.Element} The Checkout component.
 */
const Checkout = ({ isPage, cartItems, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const navigate = useNavigate();

  const navigateBack =  () => navigate(-1)

  /**
   * Handles changes in input fields for card details.
   * 
   * @param {Object} e - The event object for the input change.
   * @returns {void}
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  /**
   * Submits the payment and displays a confirmation message based on the selected payment method.
   * If paying with a card, the card number is displayed; otherwise, a message for cash payment is shown.
   * 
   * @returns {void}
   */
  const handlePaymentSubmit = () => {
    if (paymentMethod === 'cash') {
      alert('Order placed successfully! Paid with cash.');
    } else {
      alert(`Order placed successfully! Paid with card: ${cardDetails.cardNumber}`);
    }
  };

  return (
    <>
      {isPage &&
        <nav className="navbar mb-2">
          <ul>
            <li>
              <AccessibilityButton/>
            </li>
          </ul>
        </nav>
      }
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
          <button className="back-to-cart" onClick={onBack ? onBack : navigateBack}>Back to Cart</button>
          <button className='place-order' onClick={handlePaymentSubmit}>Place Order</button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
