const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // MySQL database connection pool

// Get Field by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [field] = await pool.execute('SELECT * FROM courts WHERE CourtID = ?', [id]);

    if (field.length === 0) {
      return res.status(404).json({ message: 'Field not found' });
    }

    res.status(200).json(field[0]);
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
