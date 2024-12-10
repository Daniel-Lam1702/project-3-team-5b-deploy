require('dotenv').config();  // Load environment variables from .env file
const express = require('express');  // Import Express
const cors = require('cors');  // Import CORS middleware

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
const allowedOrigins = [
    'https://project-3-team-5b.onrender.com',
    'http://localhost:5173'
  ];
  
app.use(cors({
    origin: (origin, callback) => {
    // Check if the request origin is in the allowed origins array
    if (allowedOrigins.includes(origin) || !origin) {
    callback(null, true); // Allow the request
    } else {
    callback(new Error('Not allowed by CORS')); // Block the request
    }
}
}));
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

app.get('/api/order-history', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM orders');
        res.json(result.rows);
    }
    catch(error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/menu-item-instance', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM menu_item_instance');
        res.json(result.rows);
    }
    catch(error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/menu-item/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const result = await pool.query('SELECT name FROM menu_item WHERE id = $1', [id]);
        res.json(result.rows);
    }
    catch(error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});

app.get('/api/cashier-name/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await pool.query('SELECT name FROM cashier WHERE id = $1', [userId]);
            //WHERE id = ?', [userId]);
        res.json(result.rows);     
    }
    catch(error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
