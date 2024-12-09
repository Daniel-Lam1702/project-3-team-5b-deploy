import React from 'react';
import PropTypes from 'prop-types';
import './Cart.css'; 
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { AccessibilityButton } from '../../components/Accessibility/AccessibilityButton';

/**
 * Cart component displays a list of items in the shopping cart and provides options to proceed to checkout or clear the cart.
 *
 * Props:
 * - `isPage` (boolean): Indicates whether the component is displayed as a standalone page.
 * - `cartItems` (Array): List of cart items to display. Each item includes menu item details, selected components, quantity, and pricing.
 * - `setCartItems` (Function): Updates the state of the cart items for actions like quantity adjustment or item removal.
 * - `clearCart` (Function): Clears all items in the cart.
 *
 * Features:
 * - Displays cart items with details about selected components, quantities, and pricing.
 * - Allows quantity adjustment and item removal.
 * - Shows total price of all items.
 * - Includes "Clear Cart" and "Place Order" buttons.
 *
 * Example usage:
 * const cartItems = [
 *   { menuItem: { name: 'Burger', base_price: '5.00' }, quantity: 2, side: [{ name: 'Fries', extra_cost: '1.00' }] },
 *   { menuItem: { name: 'Pizza', base_price: '8.00' }, quantity: 1, drink: [{ name: 'Juice', extra_cost: '1.50' }] }
 * ];
 *
 * const setCartItems = (updatedCartItems) => {
 *   // Update logic
 * };
 * const clearCart = () => {
 *   // Clear cart logic
 * };
 *
 * return <Cart isPage={true} cartItems={cartItems} setCartItems={setCartItems} clearCart={clearCart} />;
 *
 * @returns {JSX.Element} The Cart component.
 */
const Cart = ({ isCustomer, isPage, cartItems, setCartItems, clearCart }) => {

  const baseUrl = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : import.meta.env.VITE_POS_API_BASE_URL;

  const navigate = useNavigate();

  const requestCheckout = async () => {
    try {
      const totalPrice = calculateTotal(); // Get the total price

      const payload = {
        cartItems,
        price: parseFloat(totalPrice),
      };
      
      const response = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Order successfully completed');
        setCartItems([]);
        isCustomer ? navigate('/customer') : navigate('/cashier'); // Navigate to the customer page
      } else {
        throw new Error('Failed to process order');
      }
    } catch (error) {
      alert('Error processing your order, please try again');
      console.error('Checkout error:', error);
    }
  };

  const updateQuantity = (index, newQuantity) => {
    setCartItems((prevItems) =>{
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], quantity: newQuantity };
      return updatedItems;
    });
  };

  const removeItem = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // Calculate the price of the current item based on its quantity
      let itemTotal = parseFloat(item.menuItem.base_price || 0);
  
      const addExtraCost = (array) => {
        if (Array.isArray(array)) {
          itemTotal += array.reduce((sum, el) => sum + parseFloat(el.extra_cost || 0), 0);
        }
      };
  
      addExtraCost(item.sides);
      addExtraCost(item.entrees);
      addExtraCost(item.drink);
      addExtraCost(item.appetizer);
  
      return total + itemTotal * item.quantity; // Multiply by quantity
    }, 0).toFixed(2); // Format the total to 2 decimal places
  };

  return (
    <>
      {isPage &&      
        <nav className="navbar mb-2">
          <ul>
            <li>
              <AccessibilityButton/>
            </li>
            <li>
              <button onClick={() => navigate(-1)} className="back-button-cart">
                Back
              </button>
            </li>
          </ul>
        </nav>
      }
      <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items-list">
        <h3>Selected Items</h3>
        <ul>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <li key={index}>
                <CartItem item={item} index={index} updateQuantity={updateQuantity} removeItem={removeItem}/>
              </li>
            ))
          ) : (
            <li>No items in the cart</li>
          )}
        </ul>
      </div>
      <div className="cart-total">
        <h3>Total: ${calculateTotal()}</h3>
      </div>
      <div className="cart-buttons">
        <button className="clear-cart-button" onClick={clearCart}>
          Clear Cart
        </button>
        <button disabled={cartItems.length === 0} className={`checkout-button${cartItems.length === 0 ? ' disabled' : ''}`} onClick={requestCheckout}>
          Place Order
        </button>
      </div>
      </div>
    </>
  );
};

Cart.propTypes = {
  /**
   * The list of items currently in the cart. Each item must contain a `menuItem` object with a `name`, and may also include optional `sides`, `entrees`, `drink`, and `appetizer` arrays.
   */
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      menuItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      sides: PropTypes.oneOfType([ 
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
        })),
      ]),
      entrees: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
      drink: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
      appetizer: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  
  /**
   * The function to call when the user wants to proceed to checkout.
   */
  onContinue: PropTypes.func,

  /**
   * The function to call when the user wants to clear the cart.
   */
  clearCart: PropTypes.func,
};

Cart.defaultProps = {
  /**
   * Default value for `cartItems` is an empty array.
   */
  cartItems: [],

  /**
   * Default no-op function for `onContinue`.
   */
  onContinue: () => {},

  /**
   * Default no-op function for `clearCart`.
   */
  clearCart: () => {},
};

export default Cart;
