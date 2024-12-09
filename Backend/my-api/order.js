const express = require('express');
const pool = require('../config/db'); // Assuming your db connection is in config/db.js
const router = express.Router();

/**
 * Handles the creation of an order, its associated menu item instances, and updates inventory.
 * 
 * Workflow:
 * 1. Insert the order into the `orders` table.
 * 2. Insert each cart item into the `menu_item_instance` table.
 * 3. Insert associated components (sides, entrees, etc.) into the `menu_item_instance_components` table.
 * 4. Update the inventory based on the required quantities for each component.
 */
router.post('/', async (req, res) => {
    const client = await pool.connect();
    try {
        const { price, cartItems, cashier_id } = req.body;

        if (!price || !cartItems || !Array.isArray(cartItems)) {
            return res.status(400).json({ message: 'Invalid request data' });
        }

        const date = new Date();

        // Insert the order
        const orderQuery = `
            INSERT INTO orders (price, date, cashier_id)
            VALUES ($1, $2, $3)
            RETURNING id
        `;
        const orderValues = [price, date, cashier_id || null];
        const { rows } = await client.query(orderQuery, orderValues);
        const orderId = rows[0].id;

        console.log(`Order created with ID: ${orderId}`);

        const instanceQuery = `
            INSERT INTO menu_item_instance (order_id, menu_item_id, instance_count, price)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `;

        const componentQuery = `
            INSERT INTO menu_item_instance_components (item_instance_id, item_component_id, portion)
            VALUES ($1, $2, $3)
        `;

        const inventoryQuery = `
            SELECT ingredient_id, quantity_required
            FROM inventory_item_component
            WHERE item_component_id = $1
        `;

        const updateInventoryQuery = `
            UPDATE inventory
            SET quantity = quantity - $1
            WHERE id = $2
        `;

        for (const cartItem of cartItems) {
            const menuItemId = cartItem.menuItem.id;
            const instanceCount = cartItem.quantity;

            let itemPrice = parseFloat(cartItem.menuItem.base_price || 0);
            const addExtraCost = (array) => {
                if (Array.isArray(array)) {
                    itemPrice += array.reduce((sum, el) => sum + parseFloat(el.extra_cost || 0), 0);
                }
            };

            addExtraCost(cartItem.side);
            addExtraCost(cartItem.entrees);
            addExtraCost(cartItem.drink);
            addExtraCost(cartItem.appetizer);

            const instanceValues = [orderId, menuItemId, instanceCount, itemPrice];
            const instanceResult = await client.query(instanceQuery, instanceValues);
            const itemInstanceId = instanceResult.rows[0].id;

            const insertItemComponents = async (components) => {
                if (Array.isArray(components)) {
                    for (const component of components) {
                        // Insert into menu_item_instance_components
                        await client.query(componentQuery, [itemInstanceId, component.id, 1]);

                        // Fetch inventory_item_component entries
                        const inventoryItems = await client.query(inventoryQuery, [component.id]);

                        for (const inventoryItem of inventoryItems.rows) {
                            const { ingredient_id, quantity_required } = inventoryItem;

                            // Calculate the quantity to subtract
                            const quantityToSubtract = instanceCount * quantity_required;

                            // Update the inventory
                            await client.query(updateInventoryQuery, [quantityToSubtract, ingredient_id]);
                        }
                    }
                }
            };

            await insertItemComponents(cartItem.side);
            await insertItemComponents(cartItem.entrees);
            await insertItemComponents(cartItem.drink);
            await insertItemComponents(cartItem.appetizer);
        }

        await client.query('COMMIT');
        res.status(201).json({ message: 'Order processed successfully', orderId });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error in POST /order:', error);
        res.status(500).json({ message: 'Error processing the order' });
    } finally {
        client.release();
    }
});

module.exports = router;
