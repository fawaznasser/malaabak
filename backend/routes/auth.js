const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Import your database connection

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Set in .env file

// Sign Up Route
router.post('/signup', async (req, res) => {
  const { username, email, password, bio, preferredSports, age, sex } = req.body;

  // Validate input
  if (!username || !email || !password || !bio || !preferredSports || !age || !sex) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if email or username already exists
    const [existingUser] = await pool.execute(
      'SELECT * FROM Players WHERE Email = ? OR Username = ?',
      [email, username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email or Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const sql = `
      INSERT INTO players (Username, Email, Password, Bio, PreferredSports, Age, Sex)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [username, email, hashedPassword, bio, preferredSports, age, sex];

    await pool.execute(sql, values);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if user exists
    const [user] = await pool.execute('SELECT * FROM players WHERE Email = ?', [email]);

    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const userData = user[0];

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, userData.Password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: userData.UserID, username: userData.Username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Middleware to Verify JWT
router.get('/verify', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(200).json({ message: 'Token verified', userId: decoded.userId });
  });
});

module.exports = router;
