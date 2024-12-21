const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Create Booking
router.post('/', async (req, res) => {
  const { courtID, startTime, endTime, price, bookingStatus } = req.body;

  try {
    const sql = `
      INSERT INTO Bookings (CourtID, StartTime, EndTime, Price, BookingStatus)
      VALUES (?, ?, ?, ?, ?)
    `;
    await pool.execute(sql, [courtID, startTime, endTime, price, bookingStatus]);
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Bookings
router.get('/:courtID', async (req, res) => {
  const { courtID } = req.params;

  try {
    const [rows] = await pool.execute('SELECT * FROM Bookings WHERE CourtID = ?', [courtID]);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
