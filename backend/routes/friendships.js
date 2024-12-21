const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Database connection

// Add Friendship
router.post('/', async (req, res) => {
  const { userID1, userID2, status } = req.body;

  try {
    const sql = `
      INSERT INTO Friendships (UserID1, UserID2, Status)
      VALUES (?, ?, ?)
    `;
    await pool.execute(sql, [userID1, userID2, status]);
    res.status(201).json({ message: 'Friendship added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Friendships
router.get('/:userID', async (req, res) => {
  const { userID } = req.params;

  try {
    const [rows] = await pool.execute('SELECT * FROM Friendships WHERE UserID1 = ? OR UserID2 = ?', [userID, userID]);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
