const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host:  '127.0.0.1',  // Database host
  user:  'root',      // Database username
  password:  '0000',  // Database password
  database:  'malaabak', // Database name
  waitForConnections: true,                 // Wait for connections in the pool
  connectionLimit: 10,                      // Maximum number of connections in the pool
  queueLimit: 0,                            // Limit for pending connection requests (0 = unlimited)
});

// Export the pool with promise-based methods for better async/await support
module.exports = pool.promise();
