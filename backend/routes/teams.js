const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Create Team
router.post('/', async (req, res) => {
  const { type } = req.body;

  try {
    const sql = 'INSERT INTO Teams (Type) VALUES (?)';
    await pool.execute(sql, [type]);
    res.status(201).json({ message: 'Team created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All Teams
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Teams');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
