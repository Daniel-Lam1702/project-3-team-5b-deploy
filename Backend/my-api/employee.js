const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});

let employees = [];

app.get('/my-api/employee', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cashier');
        res.json(result.rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send('Server error');
    }
});

app.post('/api/employee', (req, res) => {
    const newEmployee = {
        id: employees.length + 1,
        name: req.body.name,
        basePrice: req.body.basePrice,
    }
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

