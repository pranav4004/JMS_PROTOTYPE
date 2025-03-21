const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs'); // For hashing passwords

// Connect to the SQLite database
const db = new sqlite3.Database('./database.db');

// Function to hash passwords
async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Insert sample data
db.serialize(async () => {
    try {
        // Add a single user (admin)
        const hashedPassword = await hashPassword('password123');
        db.run(
            'INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)',
            ['admin', hashedPassword]
        );

        // Add sample products
        const products = [
            {
                barcode_number: '123456789',
                item_name: 'Gold Necklace',
                gross_weight: 20.5,
                net_weight: 18.2,
                purity: 91.6,
                gold_rate: 5000,
                making_charges: 500,
                stone_charges: 300,
            },
            {
                barcode_number: '987654321',
                item_name: 'Diamond Ring',
                gross_weight: 10.3,
                net_weight: 9.0,
                purity: 91.6,
                gold_rate: 5000,
                making_charges: 800,
                stone_charges: 1200,
            },
            {
                barcode_number: '456789123',
                item_name: 'Silver Bracelet',
                gross_weight: 30.0,
                net_weight: 28.5,
                purity: 92.5,
                gold_rate: 80,
                making_charges: 200,
                stone_charges: 0,
            },
        ];

        for (const product of products) {
            db.run(
                'INSERT OR IGNORE INTO products (barcode_number, item_name, gross_weight, net_weight, purity, gold_rate, making_charges, stone_charges) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    product.barcode_number,
                    product.item_name,
                    product.gross_weight,
                    product.net_weight,
                    product.purity,
                    product.gold_rate,
                    product.making_charges,
                    product.stone_charges,
                ]
            );
        }

        // Add sample inventory
        db.run('INSERT OR IGNORE INTO inventory (product_id, available_stock, sold_stock) VALUES (1, 50, 10)');
        db.run('INSERT OR IGNORE INTO inventory (product_id, available_stock, sold_stock) VALUES (2, 20, 5)');
        db.run('INSERT OR IGNORE INTO inventory (product_id, available_stock, sold_stock) VALUES (3, 100, 20)');

        // Add sample orders
        db.run(
            'INSERT OR IGNORE INTO orders (customer_name, phone_number, total_amount, status) VALUES (?, ?, ?, ?)',
            ['John Doe', '1234567890', 100000, 'pending']
        );
        db.run(
            'INSERT OR IGNORE INTO orders (customer_name, phone_number, total_amount, status) VALUES (?, ?, ?, ?)',
            ['Jane Smith', '9876543210', 50000, 'ready']
        );

        // Add sample notifications
        db.run(
            'INSERT OR IGNORE INTO notifications (order_id, message) VALUES (?, ?)',
            [1, 'Your order is pending.']
        );
        db.run(
            'INSERT OR IGNORE INTO notifications (order_id, message) VALUES (?, ?)',
            [2, 'Your order is ready for pickup.']
        );

        console.log('Sample data loaded successfully!');
    } catch (error) {
        console.error('Error loading sample data:', error.message);
    } finally {
        db.close(); // Close the database connection
    }
});