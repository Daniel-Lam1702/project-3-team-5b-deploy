import React from 'react';
import PropTypes from 'prop-types';

/**
 * `CartItem` component renders the details of a single item in the shopping cart.
 * It displays the name of the menu item, its selected components (sides, entrees, drink, appetizers), 
 * quantity, and the option to update or remove the item.
 * 
 * Props:
 * - `item` (Object): The cart item object containing details about the menu item and its components.
 *   - `menuItem` (Object): Details of the menu item, including `name`, `base_price`, and `image`.
 *   - `side` (Array, optional): A list of side items, each containing details like `name` and `extra_cost`.
 *   - `entrees` (Array, optional): A list of entree items, each containing details like `name` and `extra_cost`.
 *   - `drink` (Array, optional): A list of drink items, each containing details like `name` and `extra_cost`.
 *   - `appetizer` (Array, optional): A list of appetizer items, each containing details like `name` and `extra_cost`.
 * - `index` (number): The index of the cart item in the cart array, used for direct manipulation.
 * - `updateQuantity` (Function): Function to update the quantity of the cart item. 
 *                                 It takes two arguments: the `index` and the `newQuantity`.
 * - `removeItem` (Function): Function to remove the cart item from the cart. 
 *                             It takes the `index` of the item to be removed.
 * 
 * Features:
 * - Displays the name and image of the menu item.
 * - Renders selected components (sides, entrees, drink, appetizers) as a comma-separated list.
 * - Calculates and displays the total price of the item, including base price and extra costs.
 * - Provides buttons to increase or decrease the quantity.
 * - Includes a remove button to delete the item from the cart.
 * 
 * Example usage:
 * ```jsx
 * const item = {
 *   menuItem: { name: 'Burger', base_price: '5.00' },
 *   side: [{ name: 'Fries', extra_cost: '1.00' }],
 *   entrees: [{ name: 'Chicken', extra_cost: '2.00' }],
 *   quantity: 2
 * };
 * 
 * const updateQuantity = (index, newQuantity) => {
 *   console.log(`Update item at index ${index} to quantity ${newQuantity}`);
 * };
 * 
 * const removeItem = (index) => {
 *   console.log(`Remove item at index ${index}`);
 * };
 * 
 * return <CartItem item={item} index={0} updateQuantity={updateQuantity} removeItem={removeItem} />;
 * ```
 * 
 * @component
 * @returns {JSX.Element} A JSX element representing the cart item and its details.
 */
const CartItem = ({ item, index, updateQuantity, removeItem }) => {
  /**
   * Helper function to render the list of items (sides, entrees, drinks, appetizers) as a comma-separated string.
   * 
   * @param {Array} items - An array of items to be rendered.
   * @returns {string|null} A comma-separated string of item names, or null if no items are provided.
   */
  const renderItems = (items) => {
    if (Array.isArray(items)) {
      return items.map(item => item.name).join(', ');
    }
    return null;
  };

  /**
   * Determine the image to display:
   * 1. For the menu item itself (bowl, plate, etc.), use its image.
   * 2. For A La Carte, drink, or appetizer, use the image of the first item in the respective array.
   */
  const getImage = () => {
    if (item.menuItem && ['Bowl', 'Plate', 'Bigger Plate'].includes(item.menuItem.name) && item.menuItem.image) {
      return item.menuItem.image;
    }
    if (item.side?.[0]?.image) {
      return item.side[0].image;
    }
    if (item.entrees?.[0]?.image) {
      return item.entrees[0].image;
    }
    if (item.drink?.[0]?.image) {
      return item.drink[0].image;
    }
    if (item.appetizer?.[0]?.image) {
      return item.appetizer[0].image;
    }
    return ''; // Default image or empty string if none is available.
  };

  /**
   * Calculate the total price of the cart item:
   * - Start with the base_price from the menuItem.
   * - Add up extra_cost for each element in side, entrees, drink, and appetizer arrays.
   * 
   * @returns {string} The total price as a string formatted to two decimal places.
   */
  const calculatePrice = () => {
    let totalPrice = parseFloat(item.menuItem.base_price || 0);

    // Helper to add extra_cost from arrays
    const addExtraCost = (array) => {
      if (Array.isArray(array)) {
        totalPrice += array.reduce((sum, el) => sum + parseFloat(el.extra_cost || 0), 0);
      }
    };

    // Add extra_cost from each array
    addExtraCost(item.side);
    addExtraCost(item.entrees);
    addExtraCost(item.drink);
    addExtraCost(item.appetizer);

    return totalPrice.toFixed(2); // Format to 2 decimal places
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        {getImage() && <img src={getImage()} alt={item.menuItem.name} />}
      </div>
      <div className='cart-content'>
        <h4>{item.menuItem.name}</h4>
        {item.side && (
          <div className="sides">
            <strong>Sides: </strong>
            {renderItems(item.side)}
          </div>
        )}
        {item.entrees && (
          <div className="entrees">
            <strong>Entrees: </strong>{renderItems(item.entrees)}
          </div>
        )}
        {item.drink && (
          <div className="drink">
            <strong>Drink: </strong>{renderItems(item.drink)}
          </div>
        )}
        {item.appetizer && (
          <div className="appetizer">
            <strong>Appetizer: </strong>{renderItems(item.appetizer)}
          </div>
        )}
        <div className="price">
          <strong>Price: </strong>${calculatePrice()}
        </div>
      </div>
      <div className='quantity-content'>
        <div className="quantity">
          <button disabled={item.quantity === 1} onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
        </div>
        <button className="remove-item-button" onClick={() => removeItem(index)}>
          Remove Item
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  /**
   * The cart item object containing menu item details and optional side, entree, drink, and appetizer arrays.
   */
  item: PropTypes.shape({
    menuItem: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    side: PropTypes.oneOfType([ 
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
