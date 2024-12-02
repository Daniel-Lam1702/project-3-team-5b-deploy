const express = require('express');
const pool = require('../config/db'); // Assuming your db connection is in config/db.js
const router = express.Router();

// Get all item components
router.get('/', async (req, res) => {
  try {
    console.log('Fetching item components...');
    const result = await pool.query('SELECT * FROM item_component');
    console.log('Item components fetched from the database:', result.rows); // Log the result here
    if (result.rows.length === 0) {
      console.log('No item components found in the database.');
    }
    res.json(result.rows); // Respond with the item components
  } catch (error) {
    console.error('Error fetching item components:', error);
    res.status(500).json({ message: 'Error fetching item components' });
  }
});

// Get ingredients for a specific item component
router.get('/:id/ingredients', async (req, res) => {
  const itemComponentId = req.params.id;
  try {
    console.log(`Fetching ingredients for item component ID: ${itemComponentId}`);
    // Query to fetch ingredients by joining inventory_item_component and inventory tables
    const result = await pool.query(
      `
      SELECT inventory.id, inventory.name, inventory.quantity
      FROM inventory
      INNER JOIN inventory_item_component
        ON inventory.id = inventory_item_component.ingredient_id
      WHERE inventory_item_component.item_component_id = $1
      `,
      [itemComponentId]
    );
    console.log('Ingredients fetched:', result.rows); // Log the ingredients
    res.json(result.rows); // Return the ingredients data
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    res.status(500).json({ message: 'Error fetching ingredients' });
  }
});

module.exports = router;
