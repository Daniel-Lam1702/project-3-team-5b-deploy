import React, { useState, useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from './MenuItem';
import './MenuPage.css';
import Navbar from './Navbar';
import { useFetchData } from '../../api/useFetchData';
import MenuChoices from '../../components/MenuPage/MenuChoices';
import Cart from './Cart';
import Checkout from './Checkout';

/**
 * MenuPage component for displaying and managing the menu selection interface.
 * @returns {JSX.Element} The MenuPage component.
 */
function MenuPage() {
  const [selectedMenuItem, setSelectedMenuItem] = useState({});
  const [cartItems, setCartItems] = useState([]);
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
    setSelectedMenuItem({ menuItem: item });
    if (item.name === "A La Carte") setView('A La Carte');
    else if (item.maxsides > 0) setView('side');
    else if (item.maxentrees > 0) setView('entrees');
    else if (item.hasdrink) setView('drink');
    else if (!item.maxsides && !item.maxentrees && !item.hasdrink) setView('appetizer');
    else setView('cart');
    setPopupVisible(true);
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
      setView("checkout");
    } else {
      if (view === "drink") updatedMenuItem.drink = menuChoice;
      else if (view === "appetizer") updatedMenuItem.appetizer = menuChoice;
      else updatedMenuItem.entrees = menuChoice;
      setView("checkout");
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
                isSelected={selectedMenuItem?.menuItem?.name === item.name}
              />
            ))}
          </div>
        </div>

        <div className="menu-main-content">
          {view === "cart" && <Cart cartItems={cartItems} onContinue={onCheckout} clearCart={clearCart} />}
          {view === "checkout" && <Checkout cartItems={cartItems} onBack={() => setView("cart")} />}
          {view !== "checkout" && view !== "cart" &&             
          <MenuChoices
              onContinue={onContinue}
              view={view}
              menuItemSelection={selectedMenuItem}
              itemComponents={displayOnlyItemComponents}
            />}
        </div>
      </div>
      <div>
        {isPopupVisible && (
          <div style={styles.popup}>
            <div style={styles.popupContent}>
              <span style={styles.closeBtn} onClick={hidePopup}>
                {item.allergens};
              </span>
              <p>This is an exit-able pop-up alert!</p>
            </div>
          </div>
        )}
    </div>
    </div>
  );
}

export default MenuPage;
