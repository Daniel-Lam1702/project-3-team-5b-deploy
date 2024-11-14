import React from 'react';
import PropTypes from 'prop-types';
import './Cart.css'; // Ensure to add your CSS styles here

// Individual Cart Item Component
const CartItem = ({ item }) => {
  return (
    <div className="cart-item-details">
      <strong>Menu Item:</strong> {item.menuItem?.name || 'Unnamed Item'}
      <br />
      {item.side?.length > 0 && (
        <>
          <strong>Side:</strong> {item.side.map((side) => side.name).join(', ')}
          <br />
        </>
      )}
      {item.entrees?.length > 0 && (
        <>
          <strong>Entrees:</strong> {item.entrees.map((entree) => entree.name).join(', ')}
          <br />
        </>
      )}
      {item.drink?.length > 0 && (
        <>
          <strong>Drink:</strong> {item.drink.map((drink) => drink.name).join(', ')}
          <br />
        </>
      )}
      {item.appetizer?.length > 0 && (
        <>
          <strong>Appetizer:</strong> {item.appetizer.map((appetizer) => appetizer.name).join(', ')}
          <br />
        </>
      )}
    </div>
  );
};

// PropTypes validation for CartItem component
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
const Cart = ({ cartItems, onContinue }) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items-list">
        <h3>Selected Items</h3>
        <ul>
          {cartItems?.length > 0 ? (
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
      <button className="checkout-button" onClick={onContinue}>
        Proceed to Checkout
      </button>
    </div>
  );
};

// PropTypes validation for Cart component
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
  ).isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default Cart;
