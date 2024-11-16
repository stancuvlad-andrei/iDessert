const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Use a secure key stored in environment variables in production.

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = user; // Attach the decoded token (user info) to the request object.
    next();
  });
};

module.exports = authenticateToken;
