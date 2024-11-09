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
 * @returns {JSX.Element} The MenuPage component.
 */
function MenuPage() {
  /** @type {[Object, Function]} State to manage the selected menu item */
  const [selectedMenuItem, setSelectedMenuItem] = useState({});
  /** @type {[Array, Function]} State to manage the items in the cart */
  const [cartItems, setCartItems] = useState([]);
  /** @type {[string, Function]} State to manage the current view of the page */
  const [view, setView] = useState("");

  // Fetching menu items data
  const { data: menuItems, loading: menuItemsLoading, error: menuItemsError } = useFetchData('menu-items');
  // Fetching item components data
  const { data: itemComponents, loading: itemComponentsLoading, error: itemComponentsError } = useFetchData('item-components');

  /**
   * Memoized value to filter and display only menu items that have an image.
   * @type {Array}
   */
  const displayOnlyMenuItems = useMemo(() => {
    if (menuItemsLoading) return [];
    return menuItems.filter((menuItem) => menuItem.image !== null);
  }, [menuItems, menuItemsLoading]);

  /**
   * Adds an item to a category in a map.
   * @param {Map} map - The map to update.
   * @param {string} category - The category to add the item to.
   * @param {Object} item - The item to add.
   */
  const addToFilteredMap = (map, category, item) => {
    const itemArray = map.get(category) || [];
    itemArray.push(item);
    map.set(category, itemArray);
  };

  /**
   * Memoized value to filter item components into categories.
   * @type {Map<string, Array>}
   */
  const displayOnlyItemComponents = useMemo(() => {
    if (itemComponentsLoading) return {};
    let filteredItemComponents = new Map();
    itemComponents.forEach((itemComponent) => {
      switch (itemComponent.category) {
        case 'appetizer':
          addToFilteredMap(filteredItemComponents, 'appetizer', itemComponent);
          break;
        case 'regular_entree':
        case 'premium_entree':
          addToFilteredMap(filteredItemComponents, 'entrees', itemComponent);
          break;
        case 'side':
          addToFilteredMap(filteredItemComponents, 'side', itemComponent);
          break;
        case 'drink':
          addToFilteredMap(filteredItemComponents, 'drink', itemComponent);
          break;
        default:
          break;
      }
    });
    return filteredItemComponents;
  }, [itemComponents, itemComponentsLoading]);

  /**
   * Handles the click event for selecting a menu item.
   * @param {Object} item - The menu item that was clicked.
   */
  const handleMenuItemClick = (item) => {
    setSelectedMenuItem({ menuItem: item });
    // Set the initial view based on the selected item
    if (item.name === "A La Carte") {
      setView('A La Carte');
    } else if (item.maxsides > 0) {
      setView('side');
    } else if (item.maxentrees > 0) {
      setView('entrees');
    } else if (item.hasdrink) {
      setView('drink');
    } else if (!item.maxsides && !item.maxentrees && !item.hasdrink) {
      setView('appetizer');
    } else {
      setView('cart');
    }
  };

  /**
   * Handles the continue action for adding a selection to the cart or moving to the next step.
   * @param {Array} menuChoice - The selected menu choices.
   */
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
      setView("checkout");
    } else {
      if (view === "drink") {
        updatedMenuItem.drink = menuChoice;
      } else if (view === "appetizer") {
        updatedMenuItem.appetizer = menuChoice;
      } else {
        updatedMenuItem.entrees = menuChoice;
      }
      setView("checkout");
    }

    setSelectedMenuItem(updatedMenuItem);

    // Add to cart if transitioning to checkout
    if (view !== "side" && !(view === "entrees" && selectedMenuItem?.menuItem?.name === "Panda Bundle")) {
      setCartItems([...cartItems, updatedMenuItem]);
    }
  };

  /**
   * Handles the checkout action.
   */
  const onCheckout = () => {
    console.log('Proceeding to checkout');
    console.log(cartItems);
  };

  // Render a loading spinner if data is loading
  if (menuItemsLoading || itemComponentsLoading) {
    return (
      <div className='loading-container'>
        <CircularProgress style={{ color: "white", width: '300px', height: '300px' }} />
      </div>
    );
  }

  // Render an error message if there was an error fetching data
  if (menuItemsError || itemComponentsError) {
    return <p>Error loading menu items or item components: {menuItemsError?.message || itemComponentsError?.message}</p>;
  }

  return (
    <div className="navbar-container">
      <Navbar />
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
                isSelected={selectedMenuItem && selectedMenuItem.menuItem && selectedMenuItem.menuItem.name === item.name}
              />
            ))}
          </div>
        </div>
        <div className="menu-main-content">
          {view === "checkout" ? (
            <Cart cartItems={cartItems} onContinue={onCheckout} />
          ) : (
            <MenuChoices onContinue={onContinue} view={view} menuItemSelection={selectedMenuItem} itemComponents={displayOnlyItemComponents} />
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
