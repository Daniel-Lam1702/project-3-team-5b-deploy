import React from 'react';
import PropTypes from 'prop-types';
import './Cart.css'; // Ensure to add your CSS styles here

// Individual Cart Item Component
const CartItem = ({ item }) => {
  return (
    <div className="cart-item-details">
      <strong>Menu Item:</strong> {item.menuItem?.name || 'Unnamed Item'}
      <br />
      {item.side && item.side.length > 0 && (
        <>
          <strong>Side:</strong> {item.side.map((side) => side.name).join(', ')}
          <br />
        </>
      )}
      {item.entrees && item.entrees.length > 0 && (
        <>
          <strong>Entrees:</strong> {item.entrees.map((entree) => entree.name).join(', ')}
          <br />
        </>
      )}
      {item.drink && item.drink.length > 0 && (
        <>
          <strong>Drink:</strong> {item.drink.map((drink) => drink.name).join(', ')}
          <br />
        </>
      )}
      {item.appetizer && item.appetizer.length > 0 && (
        <>
          <strong>Appetizer:</strong> {item.appetizer.map((appetizer) => appetizer.name).join(', ')}
          <br />
        </>
      )}
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    menuItem: PropTypes.shape({
      name: PropTypes.string,
    }),
    side: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
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
  }).isRequired,
};

// Main Cart Component
const Cart = ({ cartItems, onContinue, clearCart }) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items-list">
        <h3>Selected Items</h3>
        <ul>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <li key={index}>
                <CartItem item={item} />
              </li>
            ))
          ) : (
            <li>No items in the cart</li>
          )}
        </ul>
      </div>
      <div className="cart-buttons">
        <button className="checkout-button" onClick={onContinue}>
          Proceed to Checkout
        </button>
        <button className="clear-cart-button" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      menuItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      entrees: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
      side: PropTypes.arrayOf(
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
  ),
  onContinue: PropTypes.func,
  clearCart: PropTypes.func,
};

export default Cart;
