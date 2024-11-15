const express = require('express');
const app = express();
const connection = require('./config/db');

app.use(express.json());

// Route to fetch all bakeries with optional search query
app.get('/api/bakeries', (req, res) => {
  const search = req.query.search || ''; // Get the search query if available
  const query = `SELECT * FROM bakeries WHERE name LIKE '%${search}%'`;

  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching bakeries' });
    }
    res.json({ bakeries: results });
  });
});

// Route to fetch a single bakery by ID
app.get('/api/bakeries/:id', (req, res) => {
  const bakeryId = req.params.id;

  const query = 'SELECT * FROM bakeries WHERE id = ?';
  connection.query(query, [bakeryId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching bakery details' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Bakery not found' });
    }

    const bakery = results[0];

    // Fetch reviews for the bakery
    const reviewsQuery = 'SELECT * FROM reviews WHERE bakery_id = ?';
    connection.query(reviewsQuery, [bakeryId], (error, reviews) => {
      if (error) {
        return res.status(500).json({ message: 'Error fetching reviews' });
      }

      // Use the correct 'review' field to get the review text
      bakery.reviews = reviews.map(review => review.review); // Now using 'review' instead of 'comment'

      // Fetch products for the bakery
      const productsQuery = 'SELECT * FROM products WHERE bakery_id = ?';
      connection.query(productsQuery, [bakeryId], (error, products) => {
        if (error) {
          return res.status(500).json({ message: 'Error fetching products' });
        }

        bakery.products = products; // Add products to bakery data

        res.json({ bakery });
      });
    });
  });
});

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
