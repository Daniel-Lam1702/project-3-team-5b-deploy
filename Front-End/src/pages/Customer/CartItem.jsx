import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ item }) => {
  const renderSides = (sides) => {
    if (Array.isArray(sides)) {
      return sides.map((side, index) => (
        <span key={index}>{side.name || side}</span> // Handle both object and string cases
      )).reduce((prev, curr, index) => {
        // Join sides with a comma, excluding the last one
        return index === sides.length - 1 ? [prev, curr] : [prev, curr + ', '];
      }, []);
    }
    return null;
  };

  return (
    <div className="cart-item">
      <h4>{item.menuItem.name}</h4>
      {item.sides && (
        <div className="sides">
          <strong>Sides: </strong>
          {renderSides(item.sides)}
        </div>
      )}
      {item.entrees && (
        <div className="entrees">
          <strong>Entrees: </strong>{item.entrees.join(', ')}
        </div>
      )}
      {item.drink && (
        <div className="drink">
          <strong>Drink: </strong>{item.drink.join(', ')}
        </div>
      )}
      {item.appetizer && (
        <div className="appetizer">
          <strong>Appetizer: </strong>{item.appetizer.join(', ')}
        </div>
      )}
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    menuItem: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    sides: PropTypes.oneOfType([ 
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
    ]),
    entrees: PropTypes.arrayOf(PropTypes.string),
    drink: PropTypes.arrayOf(PropTypes.string),
    appetizer: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CartItem;
