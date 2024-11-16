const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Use a secure key stored in environment variables in production.

const authenticateToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Verify the token
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = user; // Attach the decoded token (user info) to the request object.
    next();
  });
};

module.exports = authenticateToken;
