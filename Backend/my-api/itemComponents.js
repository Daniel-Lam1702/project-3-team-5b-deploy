const express = require('express');
const pool = require('../config/db'); // Assuming your db connection is in config/db.js
const router = express.Router();

// Get all item components
router.get('/', async (req, res) => {
  try {
    console.log('Fetching item components...');
    const result = await pool.query('SELECT * FROM item_component ORDER BY id;');
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
      SELECT
        inventory.id AS ingredient_id, 
        inventory.name AS ingredient_name, 
        inventory_item_component.quantity_required,
        inventory.unit
      FROM 
          inventory
      INNER JOIN 
          inventory_item_component
      ON 
          inventory.id = inventory_item_component.ingredient_id
      WHERE 
          inventory_item_component.item_component_id = $1;
    `,
      [itemComponentId]
    );
    console.log('Ingredients fetched:', result.rows);
    res.json(result.rows); // Return the ingredients data
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    res.status(500).json({ message: 'Error fetching ingredients' });
  }
});

// Delete the item component by id
router.delete('/:id', async (req, res) => {
  try {
      const { id } = req.params; // Extract the id from the URL

      const result = await pool.query('DELETE FROM item_component WHERE id = $1 RETURNING *', [id]);

      if (result.rowCount === 0) {
          return res.status(404).json({ error: 'Item Component not found' });
      }

      res.json({
          message: 'Item Component deleted successfully',
          deletedItem: result.rows[0]
      });
  } catch (error) {
      console.error('Error in DELETE /api/item-components/:id:', error);
      res.status(500).send('Server error');
  }
});

// Create an item component
router.post('/', async (req, res) => {
  try {
    const {
      name,
      category,
      extra_cost,
      allergens,
      image,
      serving_size,
      calories,
      fat_calories,
      total_fat,
      saturated_fat,
      cholesterol,
      sodium,
      carbs,
      fiber,
      sugar,
      protein,
      trans_fat,
      ingredients,
    } = req.body;
    // Insert the new item component
    const result = await pool.query(
      `
      INSERT INTO item_component (
        name, category, extra_cost, allergens, image, serving_size, calories,
        fat_calories, total_fat, saturated_fat, cholesterol, sodium, carbs, fiber,
        sugar, protein, trans_fat
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
      ) RETURNING id
      `,
      [
        name,
        category,
        extra_cost,
        allergens,
        image,
        serving_size,
        calories,
        fat_calories,
        total_fat,
        saturated_fat,
        cholesterol,
        sodium,
        carbs,
        fiber,
        sugar,
        protein,
        trans_fat,
      ]
    );

    const newItemId = result.rows[0].id;

    // Insert ingredients if provided
    if (ingredients && ingredients.length > 0) {
      const ingredientQueries = ingredients.map(({ ingredient_id, quantity_required }) => {
        return pool.query(
          `
          INSERT INTO inventory_item_component (item_component_id, ingredient_id, quantity_required)
          VALUES ($1, $2, $3)
          `,
          [newItemId, ingredient_id, quantity_required]
        );
      });

      // Wait for all ingredient insertions
      await Promise.all(ingredientQueries);
    }

    res.status(201).json({ message: 'Item component created successfully', id: newItemId });
  } catch (error) {
    console.error('Error in POST /api/item-components:', error);
    res.status(500).send(error.message);
  }
});
// Edit an item component
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the item component ID from the URL
    const body = req.body; // Extract updated data from request body
    const {
      name,
      category,
      extra_cost,
      allergens,
      image,
      serving_size,
      calories,
      fat_calories,
      total_fat,
      saturated_fat,
      cholesterol,
      sodium,
      carbs,
      fiber,
      sugar,
      protein,
      trans_fat,
      ingredients,
    } = body;
    // Update the item_component details
    await pool.query(
      `
      UPDATE item_component
      SET 
        name = $1, category = $2, extra_cost = $3, allergens = $4, image = $5,
        serving_size = $6, calories = $7, fat_calories = $8, total_fat = $9, saturated_fat = $10,
        cholesterol = $11, sodium = $12, carbs = $13, fiber = $14, sugar = $15,
        protein = $16, trans_fat = $17
      WHERE id = $18
      `,
      [
        name,
        category,
        extra_cost,
        allergens,
        image,
        serving_size,
        calories,
        fat_calories,
        total_fat,
        saturated_fat,
        cholesterol,
        sodium,
        carbs,
        fiber,
        sugar,
        protein,
        trans_fat,
        id,
      ]
    );

    // Retrieve existing ingredient relationships for this item component
    const { rows: existingRows } = await pool.query(
      `SELECT * FROM inventory_item_component WHERE item_component_id = $1`,
      [id]
    );

    // Track existing ingredient IDs
    const existingIngredients = new Map(
      existingRows.map((row) => [row.ingredient_id, row.quantity_required])
    );

    // Add or update ingredients
    for (const ingredient of ingredients) {
      const { ingredient_id, quantity_required } = ingredient;
      const existingQuantity = existingIngredients.get(ingredient_id);

      if (existingQuantity) {
        if (existingQuantity !== quantity_required) {
          // Update quantity if different
          await pool.query(
            `UPDATE inventory_item_component
            SET quantity_required = $1
            WHERE item_component_id = $2 AND ingredient_id = $3`,
            [quantity_required, id, ingredient_id]
          );
        }
        // Remove from the map as it is still valid
        existingIngredients.delete(ingredient_id);
      } else {
        // Insert new ingredient
        await pool.query(
          `INSERT INTO inventory_item_component (item_component_id, ingredient_id, quantity_required)
          VALUES ($1, $2, $3)`,
          [id, ingredient_id, quantity_required]
        );
      }
    }

    // Remove ingredients no longer in the request
    for (const ingredient_id of existingIngredients.keys()) {
      await pool.query(
        `DELETE FROM inventory_item_component
        WHERE item_component_id = $1 AND ingredient_id = $2`,
        [id, ingredient_id]
      );
    }

    res.json({ message: 'Item component and ingredients updated successfully' });
  } catch (error) {
    console.error('Error in PUT /:id:', error);
    res.status(500).send(error.message);
  }
});
module.exports = router;
