const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Create Tournament
router.post('/', async (req, res) => {
  const { hostID, startTime, endTime, prize } = req.body;

  try {
    const sql = `
      INSERT INTO Tournaments (HostID, StartTime, EndTime, Prize)
      VALUES (?, ?, ?, ?)
    `;
    await pool.execute(sql, [hostID, startTime, endTime, prize]);
    res.status(201).json({ message: 'Tournament created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All Tournaments
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Tournaments');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
