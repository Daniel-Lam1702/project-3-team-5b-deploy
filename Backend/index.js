require('dotenv').config();  // Load environment variables from .env file
const express = require('express');  // Import Express
const cors = require('cors');  // Import CORS middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors({ origin: 'https://project-3-team-5b.onrender.com' }));  // Enable CORS
app.use(express.json());  // Parse JSON payloads

// Import database connection
const pool = require('./config/db');

// Define a sample route to test database connectivity
app.get('/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cashier');
        res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/menu-items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM menu_item');
        res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/item-components', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM item_component');
        res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
