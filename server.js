
const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Your MySQL username
    password: '', // Your MySQL password (leave blank if you didn't set one)
    database: 'shop' // Your database name
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

// Middleware to parse JSON requests
app.use(express.json());

// Define a route to get all products
app.get('/products', (req, res) => {
    connection.query('SELECT * FROM products', (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});

// Define a route to get product details by ID
app.get('/products/:id', (req, res) => {
    const productId = req.params.id; // Get the product ID from the URL parameters
    connection.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            return res.status(500).json({ error: 'Database query error' });
        }
        
        // Check if the product exists
        if (results.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.json(results[0]); // Return the first product in the results
    });
});
// Define a route to get product details by ID
app.get('/', (req, res) => {
    res.send('Hello, I\'m from EmDepLam Group')
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
