const express = require('express');
const app = express();
const connection = require('./config/db');
const authRoutes = require('./routes/auth');
const bakeryRoutes = require('./routes/bakeries');

app.use(express.json());

// Use routes
app.use('/api', authRoutes);
app.use('/api', bakeryRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
