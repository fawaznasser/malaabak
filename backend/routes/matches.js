const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Schedule Match
router.post('/', async (req, res) => {
  const { team1ID, team2ID, startTime, endTime } = req.body;

  try {
    const sql = `
      INSERT INTO Matches (Team1ID, Team2ID, StartTime, EndTime)
      VALUES (?, ?, ?, ?)
    `;
    await pool.execute(sql, [team1ID, team2ID, startTime, endTime]);
    res.status(201).json({ message: 'Match scheduled successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All Matches
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Matches');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
