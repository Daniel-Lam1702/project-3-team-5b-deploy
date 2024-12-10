const { Pool } = require('pg');
require('dotenv').config();  // Load environment variables from .env file

// Create a new pool using environment variables
const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});

// Export the pool for use in other files
module.exports = pool;
