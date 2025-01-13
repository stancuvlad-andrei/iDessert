const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  console.log('Token received:', token);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    console.log('Decoded user:', user);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;