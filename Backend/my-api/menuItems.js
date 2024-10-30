const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}');
});

let menuItems = [];

app.get('/my-api/menu-items', (req, res) => {
    res.json(menuItems);
});

app.post('/my-api/menu-items', (req, res) => {
    const newItem = {
        id: menuItems.length + 1,
        name: req.body.name,
        basePrice: req.body.basePrice,
    }
    menuItems.push(newItem);
    res.status(201).json(newItem);
});

