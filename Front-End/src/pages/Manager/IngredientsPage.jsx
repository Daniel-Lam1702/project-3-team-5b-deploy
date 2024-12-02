import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './IngredientsPage.css';

const IngredientsPage = () => {
  const [itemComponents, setItemComponents] = useState([]);
  const [selectedItemComponent, setSelectedItemComponent] = useState('');
  const [ingredients, setIngredients] = useState([]); // State for ingredients
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();  // Initialize useNavigate hook

  // Fetch item components on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/item-components') // Ensure full URL
      .then((response) => {
        if (Array.isArray(response.data)) {
          setItemComponents(response.data);
        } else {
          console.error('No item components found');
        }
      })
      .catch((error) => {
        console.error('Error fetching item components:', error);
        setError('Error fetching item components');
      });
  }, []);

  // Fetch ingredients when an item component is selected
  useEffect(() => {
    if (selectedItemComponent) {
      setLoading(true);
      axios.get(`http://localhost:5000/api/item-components/${selectedItemComponent}/ingredients`)
        .then((response) => {
          setIngredients(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching ingredients:', error);
          setError('Error fetching ingredients');
          setLoading(false);
        });
    }
  }, [selectedItemComponent]);

  const handleItemComponentChange = (event) => {
    setSelectedItemComponent(event.target.value);
  };

  const handleBackClick = () => {
    navigate('/manage-stuff');  // Navigate back to the Manage Stuff page
  };

  return (
    <div className="ingredients-page-container">
      <h1>Ingredients Page</h1>

      {/* Back Button */}
      <button onClick={handleBackClick} className="back-button">Back</button>

      {/* Dropdown to select item component */}
      <select value={selectedItemComponent} onChange={handleItemComponentChange}>
        <option value="">Select Item Component</option>
        {itemComponents.map((itemComponent) => (
          <option key={itemComponent.id} value={itemComponent.id}>
            {itemComponent.name}
          </option>
        ))}
      </select>

      {loading && <p>Loading ingredients...</p>}
      {error && <p>{error}</p>}

      {/* Display ingredients */}
      {ingredients.length > 0 && (
        <div>
          <h3>Ingredients</h3>
          <table className="ingredients-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient) => (
                <tr key={ingredient.id}>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IngredientsPage;
