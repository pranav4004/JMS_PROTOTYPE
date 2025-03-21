const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database (creates the file if it doesn't exist)
const db = new sqlite3.Database('./database.db');

// Initialize tables
db.serialize(() => {
    // Users Table (Single User)
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    `);

    // Products Table
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            barcode_number TEXT UNIQUE,
            item_name TEXT,
            gross_weight REAL,
            net_weight REAL,
            purity REAL,
            gold_rate REAL,
            making_charges REAL,
            stone_charges REAL
        )
    `);

    // Inventory Table
    db.run(`
        CREATE TABLE IF NOT EXISTS inventory (
            product_id INTEGER,
            available_stock INTEGER DEFAULT 0,
            sold_stock INTEGER DEFAULT 0,
            FOREIGN KEY (product_id) REFERENCES products (id)
        )
    `);

    // Orders Table
    db.run(`
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT,
            phone_number TEXT,
            total_amount REAL,
            status TEXT DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Notifications Table
    db.run(`
        CREATE TABLE IF NOT EXISTS notifications (
            order_id INTEGER,
            message TEXT,
            sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (order_id) REFERENCES orders (id)
        )
    `);
});

module.exports = db;