import React from 'react';
import './MenuBoard.css';

const MenuBoard = () => {


  const menuItems = [
    { name: 'Bowl', description: '1 side, 1 entree', price: '8.30', image: '/MenuItemImages/MenuItem/Bowl.avif' },
    { name: 'Plate', description: '1 side, 2 entrees', price: '9.80', image: '/MenuItemImages/MenuItem/Plate.avif' },
    { name: 'Bigger Plate', description: '1 side, 3 entrees', price: '11.30', image: '/MenuItemImages/MenuItem/BiggerPlate.avif' },
    { name: 'A La Carte', description: '1 side/entree', price: '4.30', image: '/MenuItemImages/MenuItem/ALaCarte.avif' },
    { name: 'Panda Bundle', description: '1 Bowl, Plate, or Bigger Plate with a Drink', price: '10.40+', image: '/MenuItemImages/MenuItem/PandaBundle.avif' },
  ];

  const entrees = [
    { name: 'Orange Chicken', image: '/MenuItemImages/Entrees/OrangeChicken.png' },
    { name: 'Beijing Beef', image: '/MenuItemImages/Entrees/BeijingBeef.png' },
    { name: 'Broccoli Beef', image: '/MenuItemImages/Entrees/BroccoliBeef.png' },
    { name: 'Teriyaki Chicken', image: '/MenuItemImages/Entrees/TeriyakiChicken.png' },
    { name: 'Mushroom Chicken', image: '/MenuItemImages/Entrees/MushroomChicken.png' },
    { name: 'Sweetfire Chicken', image: '/MenuItemImages/Entrees/SweetfireChicken.png' },
    { name: 'Bourbon Chicken', image: '/MenuItemImages/Entrees/BourbonChicken.png' },
    { name: 'Honey Walnut Shrimp', image: '/MenuItemImages/Entrees/HoneyWalnutShrimp.png', price: '(Premium $1.50)' },
    { name: 'Firecracker Shrimp', image: '/MenuItemImages/Entrees/FirecrackerShrimp.png', price: '(Premium $1.50)' }
  ];

  const sides = [
    { name: 'Chow Mein', image: '/MenuItemImages/Sides/ChowMein.png' },
    { name: 'Fried Rice', image: '/MenuItemImages/Sides/FriedRice.png' },
    { name: 'White Rice', image: '/MenuItemImages/Sides/WhiteRice.png' },
    { name: 'Super Greens', image: '/MenuItemImages/Sides/SuperGreens.png' },
  ];

  const appetizers = [
    { name: 'Chicken Egg Roll', price: '2.00', image: '/MenuItemImages/Appetizers/ChickenEggRoll.avif' },
    { name: 'Veggie Spring Roll', price: '2.00', image: '/MenuItemImages/Appetizers/VeggieSpringRoll.avif' },
    { name: 'Cream Cheese Rangoon', price: '2.00', image: '/MenuItemImages/Appetizers/CreamCheeseRangoons.avif' },
    { name: 'Apple Pie', price: '2.00', image: '/MenuItemImages/Appetizers/VeggieSpringRoll.avif' },
  ];

  const drinks = [
    { name: 'Coke', price: '4.20', image: '/MenuItemImages/Drinks/Coke.avif' },
    { name: 'Sprite', price: '2.10', image: '/MenuItemImages/Drinks/Sprite.avif' },
    { name: 'Tea', price: '2.10', image: '/MenuItemImages/Drinks/Tea.avif' },
  ];

  return (
    <div className="menu-board-container">
      <header>
        <button className="back-button" onClick={() => window.history.back()}>
          &#8592; Back
        </button>
      </header>

      <div className="menu-board">
        <div className="column">
          <h2>Menu Items</h2>
          {menuItems.map((item, index) => (
            <div key={index} className="item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>${item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="column">
          <h2>Entrees</h2>
          {entrees.map((item, index) => (
            <div key={index} className="item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                {item.price && <p>{item.price}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="column">
          <h2>Sides</h2>
          {sides.map((item, index) => (
            <div key={index} className="item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
            </div>
          ))}
        </div>

        <div className="column">
          <h2>Appetizers</h2>
          {appetizers.map((item, index) => (
            <div key={index} className="item">
              <img src={item.image} alt={item.name}/>
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
            </div>
          ))}
          <h2>Drinks</h2>
          {drinks.map((item, index) => (
            <div key={index} className="item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuBoard;
