const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../config/db'); // MySQL database connection pool

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password, bio, preferredSports, age, sex } = req.body;

  // Validate input
  if (!username || !email || !password || !bio || !preferredSports || !age || !sex) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if username or email already exists
    const [existingPlayer] = await pool.execute(
      'SELECT * FROM players WHERE Username = ? OR Email = ?',
      [username, email]
    );

    if (existingPlayer.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into the database
    const sql = `
      INSERT INTO players (Username, Email, Password, Bio, PreferredSports, Age, Sex)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [username, email, hashedPassword, bio, preferredSports, age, sex];

    await pool.execute(sql, values);

    res.status(201).json({ message: 'Player registered successfully' });
  } catch (err) {
    console.error('Database Error:', err); // Detailed error logging for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Player by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [player] = await pool.execute('SELECT * FROM players WHERE UserID = ?', [id]);

    if (player.length === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.status(200).json(player[0]);
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search Players by Username
router.get('/search', async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: 'Username query parameter is required' });
  }

  try {
    const [results] = await pool.execute(
      'SELECT UserID, Username FROM players WHERE Username LIKE ?',
      [`%${username}%`]
    );

    res.status(200).json(results);
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Player Profile
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { bio, preferredSports, age, sex } = req.body;

  if (!bio || !preferredSports || !age || !sex) {
    return res.status(400).json({ message: 'All fields are required for update' });
  }

  try {
    const sql = `
      UPDATE players
      SET Bio = ?, PreferredSports = ?, Age = ?, Sex = ?
      WHERE UserID = ?
    `;
    const values = [bio, preferredSports, age, sex, id];

    const [result] = await pool.execute(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.status(200).json({ message: 'Player updated successfully' });
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Player
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const sql = 'DELETE FROM players WHERE UserID = ?';
    const [result] = await pool.execute(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.status(200).json({ message: 'Player deleted successfully' });
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
