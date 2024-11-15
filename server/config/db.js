const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'stnvdn',
  database: 'iDessertDB'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
  } else {
    console.log('Connected to MySQL as id ' + connection.threadId);
  }
});

module.exports = connection;
