import React, { useState } from 'react';
import MenuItem from './MenuItem';
import SideChoices from './SideChoices';
import EntreeChoices from './EntreeChoices'; 
import Cart from './Cart'; // Import the Cart component
import './MenuPage.css';

function MenuPage({ setShowSidebar }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [sides] = useState(['Chow Mein', 'Fried Rice', 'White Rice', 'Super Greens']);
  const [selectedEntree, setSelectedEntree] = useState(null);
  const [selectedSides, setSelectedSides] = useState([]);
  const [cartItems, setCartItems] = useState([]); // State to track items in the cart
  const [view, setView] = useState('sides'); // New state to manage the current view

  const menuItems = [
    { name: 'Bowl', description: 'Choose 1 entree and 1 side', image: '/MenuItemImages/MenuItem/Bowl.avif', maxSides: 1 },
    { name: 'Plate', description: 'Choose 2 entrees and 1 side', image: '/MenuItemImages/MenuItem/Plate.avif', maxSides: 1 },
    { name: 'Bigger Plate', description: 'Choose 3 entrees and 1 side', image: '/MenuItemImages/MenuItem/BiggerPlate.avif', maxSides: 1 },
    { name: 'A La Carte', description: 'Order entrees or sides individually', image: '/MenuItemImages/MenuItem/ALaCarte.avif', maxSides: 3 },
    { name: 'Panda Bundle', description: 'Family-style bundle for group dining', image: '/MenuItemImages/MenuItem/PandaBundle.avif', maxSides: 3 },
  ];

  const entrees = [
    'Orange Chicken', 'Teriyaki Chicken', 'Bourbon Chicken', 
    'Sweetfire Chicken', 'Firecracker Shrimp', 
    'Honey Walnut Shrimp', 'Kung Pao Chicken', 
    'Beijing Beef', 'Broccoli Beef', 'Mushroom Chicken'
  ];

  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
    setSelectedEntree(null);
    setSelectedSides([]);
    setView('sides'); // Set view to sides when a menu item is selected
  };

  const handleContinueToEntrees = (selectedSides) => {
    setSelectedSides(selectedSides);
    setView('entrees'); // Switch to entrees selection
  };

  const handleContinueToCart = () => {
    // Add selected entree and sides to the cart
    setCartItems((prevCartItems) => [
      ...prevCartItems,
      { entree: selectedEntree, sides: selectedSides },
    ]);
    // Clear selections after adding to cart
    setSelectedEntree(null);
    setSelectedSides([]);
    setView('cart'); // Switch to cart view
  };

  return (
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
                selectedEntree={selectedEntree} 
                onSelectEntree={(entree) => {
                  setSelectedEntree(entree);
                  // Do not call handleContinueToCart here
                }} 
                onContinue={handleContinueToCart} // Pass continue handler here
              />
            )}
            {view === 'cart' && (
              <Cart 
                cartItems={cartItems} // Pass the accumulated cart items
                onContinue={() => console.log('Proceeding to checkout')} // Replace with actual checkout functionality
              />
            )}
          </div>
        ) : (
          <h1>Select a Menu Item</h1>
        )}
      </div>
    </div>
  );
}

export default MenuPage;
