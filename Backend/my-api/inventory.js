const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Assuming your `db.js` is already set up

// Fetch all ingredients
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM inventory');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
});

// Add a new ingredient
router.post('/', async (req, res) => {
    const { name, quantity, unit, reorder_level } = req.body; // Include reorder_level
    try {
        const result = await pool.query(
            'INSERT INTO inventory (name, quantity, unit, reorder_level) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, quantity, unit, reorder_level]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add ingredient' });
    }
});


// Update an ingredient
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity, unit, reorder_level } = req.body; // Include reorder_level
    try {
        const result = await pool.query(
            'UPDATE inventory SET name = $1, quantity = $2, unit = $3, reorder_level = $4 WHERE id = $5 RETURNING *',
            [name, quantity, unit, reorder_level, id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update ingredient' });
    }
});


// Delete an ingredient
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM inventory WHERE id = $1', [id]);
        res.json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete ingredient' });
    }
});

module.exports = router;
