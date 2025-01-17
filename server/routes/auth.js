const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');
const authenticateToken = require('../middleware/authenticate');
const router = express.Router();

const secretKey = 'your_secret_key';

// Register User
router.post('/register', async (req, res) => {
  const { username, email, password, isOwner } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Query to check if the email is already in use
    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkEmailQuery, [email], (checkError, checkResults) => {
      if (checkError) {
        return res.status(500).json({ message: 'Error checking email availability' });
      }
      if (checkResults.length > 0) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Insert the new user into the database (no bakery_id field now)
      const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
      connection.query(query, [username, email, hashedPassword, isOwner ? 'owner' : 'client'], (error) => {
        if (error) {
          console.error('Database error:', error);
          return res.status(500).json({ message: 'Error registering user' });
        }
        res.json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login user
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], async (error, results) => {
    if (error) return res.status(500).json({ message: 'Error logging in' });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, isOwner: user.role === 'owner' }, secretKey, { expiresIn: '1h' });
    console.log('Generated token:', token);
    res.json({ token, isOwner: user.role === 'owner' });
  });
});

// Fetch User Details (for Account Page)
router.get('/account', authenticateToken, (req, res) => {
  const userId = req.user.id;

  const query = 'SELECT id, username, email, role FROM users WHERE id = ?';
  connection.query(query, [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Error fetching user details' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    res.json(user);
  });
});

module.exports = router;
