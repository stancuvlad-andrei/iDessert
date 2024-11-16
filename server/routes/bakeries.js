const express = require('express');
const connection = require('../config/db');
const authenticateToken = require('../middleware/authenticate');
const router = express.Router();

router.get('/bakeries', (req, res) => {
  const search = req.query.search || '';
  const query = `SELECT * FROM bakeries WHERE name LIKE '%${search}%'`;

  connection.query(query, (error, results) => {
    if (error) return res.status(500).json({ message: 'Error fetching bakeries' });
    res.json({ bakeries: results });
  });
});

router.get('/bakeries/:id', (req, res) => {
  const bakeryId = req.params.id;

  const query = 'SELECT * FROM bakeries WHERE id = ?';
  connection.query(query, [bakeryId], (error, results) => {
    if (error) return res.status(500).json({ message: 'Error fetching bakery details' });
    if (results.length === 0) return res.status(404).json({ message: 'Bakery not found' });

    const bakery = results[0];
    const reviewsQuery = 'SELECT * FROM reviews WHERE bakery_id = ?';
    connection.query(reviewsQuery, [bakeryId], (error, reviews) => {
      if (error) return res.status(500).json({ message: 'Error fetching reviews' });
      bakery.reviews = reviews.map(review => review.review);

      const productsQuery = 'SELECT * FROM products WHERE bakery_id = ?';
      connection.query(productsQuery, [bakeryId], (error, products) => {
        if (error) return res.status(500).json({ message: 'Error fetching products' });
        bakery.products = products;
        res.json({ bakery });
      });
    });
  });
});

module.exports = router;
