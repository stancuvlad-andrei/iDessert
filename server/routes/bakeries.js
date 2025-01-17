const express = require('express');
const connection = require('../config/db');
const authenticateToken = require('../middleware/authenticate');
const router = express.Router();

// Fetch all bakeries with optional search query
router.get('/bakeries', (req, res) => {
  const search = req.query.search || '';
  const query = `SELECT * FROM bakeries WHERE name LIKE '%${search}%'`;

  connection.query(query, (error, results) => {
    if (error) return res.status(500).json({ message: 'Error fetching bakeries' });
    res.json({ bakeries: results });
  });
});

// Fetch a specific bakery's details
router.get('/bakeries/:id', (req, res) => {
  const bakeryId = req.params.id;

  const query = 'SELECT * FROM bakeries WHERE id = ?';
  connection.query(query, [bakeryId], (error, results) => {
    if (error) return res.status(500).json({ message: 'Error fetching bakery details' });
    if (results.length === 0) return res.status(404).json({ message: 'Bakery not found' });

    const bakery = results[0];

    // Fetch reviews for the bakery
    const reviewsQuery = 'SELECT * FROM reviews WHERE bakery_id = ?';
    connection.query(reviewsQuery, [bakeryId], (error, reviews) => {
      if (error) return res.status(500).json({ message: 'Error fetching reviews' });
      bakery.reviews = reviews.map(review => review.review);

      // Fetch products for the bakery
      const productsQuery = 'SELECT * FROM products WHERE bakery_id = ?';
      connection.query(productsQuery, [bakeryId], (error, products) => {
        if (error) return res.status(500).json({ message: 'Error fetching products' });
        bakery.products = products;
        res.json({ bakery });
      });
    });
  });
});

// Add a new bakery (POST)
router.post('/bakeries', authenticateToken, (req, res) => {
  const { name, address, city, phone, email, website } = req.body;

  // Ensure required fields are provided
  if (!name || !address || !city || !phone || !email) {
    return res.status(400).json({ message: 'All fields except website are required' });
  }

  const query = 'INSERT INTO bakeries (name, address, city, phone, email, website) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(query, [name, address, city, phone, email, website || null], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error adding bakery' });
    }
    res.status(201).json({ message: 'Bakery added successfully', bakeryId: results.insertId });
  });
});

// Delete a bakery (DELETE)
router.delete('/bakeries/:id', authenticateToken, (req, res) => {
  const bakeryId = req.params.id;

  // Check if the bakery exists
  const checkBakeryQuery = 'SELECT * FROM bakeries WHERE id = ?';
  connection.query(checkBakeryQuery, [bakeryId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error checking bakery' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Bakery not found' });
    }

    // Delete the bakery
    const deleteBakeryQuery = 'DELETE FROM bakeries WHERE id = ?';
    connection.query(deleteBakeryQuery, [bakeryId], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Error deleting bakery' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Failed to delete bakery' });
      }

      res.json({ message: 'Bakery deleted successfully' });
    });
  });
});

// Add a new product to a specific bakery (POST)
router.post('/bakeries/:id/products', authenticateToken, (req, res) => {
  const bakeryId = req.params.id;
  const { name, description, price, quantity } = req.body;

  if (!name || !price || !quantity) {
    return res.status(400).json({ message: 'Product name, price, and quantity are required' });
  }

  const query = 'INSERT INTO products (bakery_id, name, description, price, quantity) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [bakeryId, name, description, price, quantity], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error adding product' });
    }
    res.status(201).json({ message: 'Product added successfully' });
  });
});

// Fetch a specific product from a bakery
router.get('/bakeries/:bakeryId/products/:productId', (req, res) => {
  const { bakeryId, productId } = req.params;

  const query = 'SELECT * FROM products WHERE id = ? AND bakery_id = ?';
  connection.query(query, [productId, bakeryId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching product' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ product: results[0] });
  });
});

// Fetch random products from bakeries with good reviews
router.get('/random-products', (req, res) => {
  const query = `
    SELECT DISTINCT p.* 
    FROM products p
    JOIN bakeries b ON p.bakery_id = b.id
    JOIN reviews r ON b.id = r.bakery_id
    WHERE r.sentiment = 'good'
    ORDER BY RAND()
    LIMIT 3;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching random products:', error);
      return res.status(500).json({ message: 'Error fetching random products' });
    }
    res.json({ products: results });
  });
});

// Checkout route
router.post('/checkout', async (req, res) => {
  const { cart, bakeryId } = req.body;
  let totalAmount = 0;

  try {
    for (const item of cart) {
      const productTotal = item.quantity * item.price;
      totalAmount += productTotal;

      const updateQuery = 'UPDATE products SET quantity = quantity - ? WHERE id = ?';
      await connection.promise().query(updateQuery, [item.quantity, item.id]);

      const orderQuery = 'INSERT INTO orders (bakery_id, product_id, quantity, total_amount) VALUES (?, ?, ?, ?)';
      await connection.promise().query(orderQuery, [bakeryId, item.id, item.quantity, productTotal]);
    }

    const revenueQuery = `
      INSERT INTO revenue (bakery_id, amount) 
      VALUES (?, ?) 
      ON DUPLICATE KEY UPDATE amount = amount + ?
    `;
    await connection.promise().query(revenueQuery, [bakeryId, totalAmount, totalAmount]);

    res.status(200).json({ message: 'Checkout successful' });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Failed to process checkout' });
  }
});

// Update an existing product in a bakery (PUT)
router.put('/bakeries/:bakeryId/products/:productId', authenticateToken, (req, res) => {
  const { bakeryId, productId } = req.params;
  const { name, description, price, quantity } = req.body;

  let updateQuery = 'UPDATE products SET ';
  let updateValues = [];

  if (name) {
    updateQuery += 'name = ?, ';
    updateValues.push(name);
  }
  if (description) {
    updateQuery += 'description = ?, ';
    updateValues.push(description);
  }
  if (price) {
    updateQuery += 'price = ?, ';
    updateValues.push(price);
  }
  if (quantity) {
    updateQuery += 'quantity = ?, ';
    updateValues.push(quantity);
  }

  updateQuery = updateQuery.slice(0, -2);
  updateQuery += ' WHERE id = ? AND bakery_id = ?';

  updateValues.push(productId, bakeryId);

  connection.query(updateQuery, updateValues, (error, results) => {
    if (error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ message: 'Error updating product' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully' });
  });
});

// Delete a product from a bakery (DELETE)
router.delete('/bakeries/:bakeryId/products/:productId', authenticateToken, (req, res) => {
  const { bakeryId, productId } = req.params;

  const query = 'DELETE FROM products WHERE id = ? AND bakery_id = ?';
  connection.query(query, [productId, bakeryId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error deleting product' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product removed successfully' });
  });
});

// Fetch bakery telemetry (visits, orders, revenue)
router.get('/bakeries/:id/telemetry', authenticateToken, (req, res) => {
  const bakeryId = req.params.id;

  const visitsQuery = 'SELECT COUNT(*) AS visits FROM visits WHERE bakery_id = ?';
  const ordersQuery = `
    SELECT 
      COUNT(*) AS orders, 
      SUM(total_amount) AS revenue 
    FROM orders 
    WHERE bakery_id = ?
  `;

  connection.query(visitsQuery, [bakeryId], (error, visitsResults) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching visits' });
    }

    connection.query(ordersQuery, [bakeryId], (error, ordersResults) => {
      if (error) {
        return res.status(500).json({ message: 'Error fetching orders' });
      }

      const telemetry = {
        visits: visitsResults[0].visits,
        orders: ordersResults[0].orders,
        revenue: ordersResults[0].revenue || 0,
      };

      res.json({ telemetry });
    });
  });
});

// Log a visit to a bakery
router.post('/bakeries/:id/visit', (req, res) => {
  const bakeryId = req.params.id;

  const query = 'INSERT INTO visits (bakery_id) VALUES (?)';
  connection.query(query, [bakeryId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error logging visit' });
    }
    res.json({ message: 'Visit logged successfully' });
  });
});

// Add a review to a bakery
router.post('/bakeries/:id/reviews', (req, res) => {
  const { id } = req.params;
  const { review, sentiment } = req.body;

  const query = 'INSERT INTO reviews (bakery_id, review, sentiment) VALUES (?, ?, ?)';
  connection.query(query, [id, review, sentiment], (error, results) => {
    if (error) {
      console.error('Error adding review:', error);
      return res.status(500).json({ message: 'Failed to add review' });
    }
    res.status(201).json({ message: 'Review added successfully' });
  });
});

module.exports = router;