import React, { useState, useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from './MenuItem';
import './MenuPage.css';
import Navbar from './Navbar';
import { useFetchData } from '../../api/useFetchData';
import MenuChoices from '../../components/MenuPage/MenuChoices';
import Cart from './Cart';

/**
 * MenuPage component for displaying and managing the menu selection interface.
 * 
 * This component allows users to browse menu items, select their choices (sides, entrees, drinks, appetizers),
 * and add items to their cart. It supports interaction with the cart through the provided props.
 * 
 * Props:
 * @param {Array} cartItems - An array of current items in the cart. Each item includes the menu item details, 
 *                            quantity, and any selected components (e.g., sides, entrees).
 * @param {Function} setCartItems - A function to update the state of cart items. Used for adding items to the cart.
 * 
 * Features:
 * - Displays menu items fetched from an API.
 * - Supports selecting components (sides, entrees, drinks, appetizers) based on the menu item's configuration.
 * - Allows adding selected items to the cart.
 * - Dynamically updates the cart state with selected items and their details.
 * 
 * Example usage:
 * ```
 * const [cartItems, setCartItems] = useState([]);
 * 
 * return <MenuPage cartItems={cartItems} setCartItems={setCartItems} />;
 * ```
 * 
 * @component
 * @returns {JSX.Element} The MenuPage component.
 */
function MenuPage({ cartItems, setCartItems }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState({});
  const [view, setView] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);

  // Fetch menu items and item components
  const { data: menuItems, loading: menuItemsLoading, error: menuItemsError } = useFetchData('menu-items');
  const { data: itemComponents, loading: itemComponentsLoading, error: itemComponentsError } = useFetchData('item-components');

  // Filtered menu items with images
  const displayOnlyMenuItems = useMemo(() => {
    if (menuItemsLoading) return [];
    return menuItems.filter((menuItem) => menuItem.image !== null);
  }, [menuItems, menuItemsLoading]);

  /**
   * Handles the click event for selecting a menu item.
   * @param {Object} item - The menu item that was clicked.
   */
  const addToFilteredMap = (map, category, item) => {
    const items = map.get(category) || [];
    map.set(category, [...items, item]);
  };

  /**
   * Memoized value to filter item components into categories.
   * @type {Map<string, Array>}
   */
  const displayOnlyItemComponents = useMemo(() => {
    if (itemComponentsLoading) return {};
    let filteredItemComponents = new Map();
    itemComponents.forEach((itemComponent) => {
      let category = itemComponent.category || 'other';
      if (category.includes("entree")) category = "entrees";
      addToFilteredMap(filteredItemComponents, category, itemComponent);
    });
    return filteredItemComponents;
  }, [itemComponents, itemComponentsLoading]);

  // Handle menu item click to set initial view based on item type
  const handleMenuItemClick = (item) => {
    setSelectedMenuItem({ menuItem: item, quantity: 1 });
    if (item.name === "A La Carte") setView('A La Carte');
    else if (item.maxsides > 0) setView('side');
    else if (item.maxentrees > 0) setView('entrees');
    else if (item.hasdrink) setView('drink');
    else if (!item.maxsides && !item.maxentrees && !item.hasdrink) setView('appetizer');
    else setView('cart');
  };

  const onContinue = (menuChoice) => {
    let updatedMenuItem = { ...selectedMenuItem };
    if (view === "side") {
      updatedMenuItem.side = menuChoice;
      setView("entrees");
    } else if (view === "entrees" && selectedMenuItem?.menuItem?.name === "Panda Bundle") {
      updatedMenuItem.entrees = menuChoice;
      setView("drink");
    } else if (view === "A La Carte") {
      const isEntree = displayOnlyItemComponents.get('entrees').some(entree => entree.name === menuChoice[0]?.name);
      updatedMenuItem = isEntree ? { ...updatedMenuItem, entrees: menuChoice } : { ...updatedMenuItem, side: menuChoice };
      setView("cart");
    } else {
      if (view === "drink") updatedMenuItem.drink = menuChoice;
      else if (view === "appetizer") updatedMenuItem.appetizer = menuChoice;
      else updatedMenuItem.entrees = menuChoice;
      setView("cart");
    }

    setSelectedMenuItem(updatedMenuItem);
    if (view !== "side" && !(view === "entrees" && selectedMenuItem?.menuItem?.name === "Panda Bundle")) {
      setCartItems([...cartItems, updatedMenuItem]); // Add updated menu item to cart
    }
  };

  const onCheckout = () => {
    setView('checkout'); // Set view to checkout
  };

  // Clear cart function to reset cart items
  const clearCart = () => {
    setCartItems([]);
  };

  if (menuItemsLoading || itemComponentsLoading) {
    return (
      <div className='loading-container'>
        <CircularProgress style={{ color: "white", width: '300px', height: '300px' }} />
      </div>
    );
  }

  if (menuItemsError || itemComponentsError) {
    return <p>Error loading menu items or item components: {menuItemsError?.message || itemComponentsError?.message}</p>;
  }

  return (
    <div className="navbar-container">
      <Navbar backLink={"/customer"}/>
      <div className="menu-page">
        <div className="menu-sidebar">
          <h2>Menu Items</h2>
          <div className="menu-items-scroll">
            {displayOnlyMenuItems.map((item, index) => (
              <MenuItem
                key={index + item.name}                
                name={item.name}
                description={item.description}
                image={item.image}
                onClick={() => handleMenuItemClick(item)}
                isSelected={selectedMenuItem?.menuItem?.name === item.name}
              />
            ))}
          </div>
        </div>

        <div className="menu-main-content">
          {view === "cart" && <Cart isPage={false} cartItems={cartItems} setCartItems={setCartItems} onContinue={onCheckout} clearCart={clearCart} />}
          {view !== "cart" &&             
          <MenuChoices
              onContinue={onContinue}
              view={view}
              menuItemSelection={selectedMenuItem}
              itemComponents={displayOnlyItemComponents}
            />}
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
