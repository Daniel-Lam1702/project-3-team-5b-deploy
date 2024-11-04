import React, { useState } from 'react';
import MenuItem from './MenuItem';
import SideChoices from './SideChoices';
import EntreeChoices from './EntreeChoices'; 
import Cart from './Cart';
import './MenuPage.css';
import Navbar from './Navbar';

function MenuPage({ setShowSidebar }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [sides] = useState(['Chow Mein', 'Fried Rice', 'White Rice', 'Super Greens']);
  const [selectedEntrees, setSelectedEntrees] = useState([]); // Updated to handle multiple entrees
  const [selectedSides, setSelectedSides] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [view, setView] = useState('sides');

  const menuItems = [
    { name: 'Bowl', description: 'Choose 1 entree and 1 side', image: '/MenuItemImages/MenuItem/Bowl.avif', maxEntrees: 1, maxSides: 1 },
    { name: 'Plate', description: 'Choose 2 entrees and 1 side', image: '/MenuItemImages/MenuItem/Plate.avif', maxEntrees: 2, maxSides: 1 },
    { name: 'Bigger Plate', description: 'Choose 3 entrees and 1 side', image: '/MenuItemImages/MenuItem/BiggerPlate.avif', maxEntrees: 3, maxSides: 1 },
    { name: 'A La Carte', description: 'Order entrees or sides individually', image: '/MenuItemImages/MenuItem/ALaCarte.avif', maxEntrees: 3, maxSides: 3 },
    { name: 'Panda Bundle', description: 'Family-style bundle for group dining', image: '/MenuItemImages/MenuItem/PandaBundle.avif', maxEntrees: 3, maxSides: 3 },
  ];

  const entrees = [
    'Orange Chicken', 'Teriyaki Chicken', 'Bourbon Chicken', 
    'Sweetfire Chicken', 'Firecracker Shrimp', 
    'Honey Walnut Shrimp', 'Kung Pao Chicken', 
    'Beijing Beef', 'Broccoli Beef', 'Mushroom Chicken'
  ];

  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
    setSelectedEntrees([]); // Reset selected entrees when menu item is clicked
    setSelectedSides([]);
    setView('sides');
  };

  const handleContinueToEntrees = (selectedSides) => {
    setSelectedSides(selectedSides);
    setView('entrees');
  };

  const handleContinueToCart = () => {
    setCartItems((prevCartItems) => [
      ...prevCartItems,
      {
        menuItem: selectedMenuItem.name,  // Track the selected menu item
        entrees: selectedEntrees,          // Ensure selected entrees are in an array
        sides: selectedSides,              // Ensure selected sides are in an array
      },
    ]);
    setSelectedEntrees([]); // Reset selected entrees
    setSelectedSides([]);   // Reset selected sides
    setView('cart');        // Switch to cart view
  };

  const handleSelectEntrees = (selected) => {
    setSelectedEntrees(selected); // Update selected entrees
  };

  return (
    <div className="navbar-container">
      <Navbar /> 
      <div className="menu-page">
        {setShowSidebar && (
          <div className="menu-sidebar">
            <h2>Menu Items</h2>
            <div className="menu-items-scroll">
              {menuItems.map((item, index) => (
                <MenuItem 
                  key={index} 
                  name={item.name} 
                  description={item.description} 
                  image={item.image} 
                  onClick={() => handleMenuItemClick(item)} 
                  isSelected={selectedMenuItem && selectedMenuItem.name === item.name}
                />
              ))}
            </div>
          </div>
        )}
        <div className="menu-main-content">
          {selectedMenuItem ? (
            <div>
              {view === 'sides' && (
                <SideChoices 
                  sides={sides} 
                  maxSides={selectedMenuItem.maxSides}
                  onContinue={handleContinueToEntrees} 
                />
              )}
              {view === 'entrees' && (
                <EntreeChoices 
                  entrees={entrees} 
                  maxEntrees={selectedMenuItem.maxEntrees}
                  selectedEntrees={selectedEntrees} // Pass selected entrees array
                  onSelectEntrees={handleSelectEntrees} // Correct function name
                  onContinue={handleContinueToCart} 
                />
              )}
              {view === 'cart' && (
                <Cart 
                  cartItems={cartItems} 
                  onContinue={() => console.log('Proceeding to checkout')} 
                />
              )}
            </div>
          ) : (
            <h1>Select a Menu Item</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
