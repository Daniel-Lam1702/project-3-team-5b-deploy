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
app.get('/api/employees', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cashier');
        res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});


app.put('/api/employees/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the id from the URL
        const { name, hours_worked, password, manager_id } = req.body; // Extract updated data from request body
        const result = await pool.query(
            'UPDATE cashier SET name = $1, hours_worked = $2, password = $3, manager_id = $4 WHERE id = $5 RETURNING *',
            [name, hours_worked, password, manager_id, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(result.rows[0]); // Send back the updated employee
    } catch (error) {
        console.error('Error in PUT /my-api/employee/:id:', error);
        res.status(500).send('Server error');
    }
});


app.post('/api/employees', async (req, res) => {
    try {
        const { name, hours_worked, password, manager_id } = req.body;
        const result = await pool.query(
            'INSERT INTO cashier (name, hours_worked, password, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, hours_worked, password, manager_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).send('Server error');
    }
});

app.delete('/api/employees/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the id from the URL
        const result = await pool.query('DELETE FROM cashier WHERE id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully', deletedEmployee: result.rows[0] });
    } catch (error) {
        console.error('Error in DELETE /my-api/employee/:id:', error);
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
