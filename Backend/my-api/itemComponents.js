const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});

let itemComponents = [];

app.get('/my-api/item-components', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cashier');
        res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});

app.post('/my-api/item-components', (req, res) => {
    const newItem = {
        id: menuItems.length + 1,
        name: req.body.name,
        extraCost: req.body.extraCost,
        category: req.body.category,
    }
    itemComponents.push(newItem);
    res.status(201).json(newItem);
});