import React, { useState, useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from './MenuItem';
import SideChoices from './SideChoices';
import EntreeChoices from './EntreeChoices'; 
import Cart from './Cart';
import './MenuPage.css';
import Navbar from './Navbar';
import { useFetchData } from '../../api/useFetchData';

function MenuPage({ setShowSidebar }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [sides] = useState(['Chow Mein', 'Fried Rice', 'White Rice', 'Super Greens']);
  const [selectedEntrees, setSelectedEntrees] = useState([]); // Updated to handle multiple entrees
  const [selectedSides, setSelectedSides] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [view, setView] = useState('sides');

  const { data: menuItems, loading: menuItemsLoading, error: menuItemsError } = useFetchData('menu-items');
  const { data: itemComponents, loading: itemComponentsLoading, error: itemComponentsError } = useFetchData('item-components');

  const displayOnlyMenuItems = useMemo(()=>{
    if (menuItemsLoading){
      return []
    }
    return menuItems.filter((menuItem) => menuItem.image !== null)
  },[menuItems, menuItemsLoading])

  const entrees = [
    'Orange Chicken', 'Teriyaki Chicken', 'Bourbon Chicken', 
    'Sweetfire Chicken', 'Firecracker Shrimp', 
    'Honey Walnut Shrimp', 'Kung Pao Chicken', 
    'Beijing Beef', 'Broccoli Beef', 'Mushroom Chicken'
  ];

  const handleMenuItemClick = (item) => {
    console.log(item);
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

  if(menuItemsLoading){
    return <div className='loading-container'>
      <CircularProgress style={{color: "white", width: '300px', height: '300px'}}/>
    </div>;
  }

  return (
    <div className="navbar-container">
      <Navbar /> 
      <div className="menu-page">
        {setShowSidebar && (
          <div className="menu-sidebar">
            <h2>Menu Items</h2>
            <div className="menu-items-scroll">
              {displayOnlyMenuItems.map((item, index) => (
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
                  maxSides={selectedMenuItem.maxsides}
                  onContinue={handleContinueToEntrees} 
                />
              )}
              {view === 'entrees' && (
                <EntreeChoices 
                  entrees={entrees} 
                  maxEntrees={selectedMenuItem.maxentrees}
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
