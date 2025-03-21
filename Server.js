const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Login Route (Single User)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Hardcoded single user credentials
    const validUsername = 'admin';
    const validPassword = 'password123';

    if (username === validUsername && password === validPassword) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Get Inventory
app.get('/api/inventory', (req, res) => {
    db.all('SELECT * FROM inventory', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Add Product
app.post('/api/products', (req, res) => {
    const { barcode_number, item_name, gross_weight, net_weight, purity, gold_rate, making_charges, stone_charges } = req.body;

    db.run(
        'INSERT INTO products (barcode_number, item_name, gross_weight, net_weight, purity, gold_rate, making_charges, stone_charges) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [barcode_number, item_name, gross_weight, net_weight, purity, gold_rate, making_charges, stone_charges],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});