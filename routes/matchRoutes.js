const express = require('express');
const router = express.Router();
const axios = require('axios');
const matchService = require('../controllers/matchController');
require('dotenv').config();

const CRIC_API_KEY = process.env.CRIC_API_KEY;

// @route   GET /api/matches/live
// @desc    Get all live matches
// @access  Public
router.get('/live', async (req, res) => {
    try {
      const offset = req.query.offset || 0; // Dynamic offset from query params
      const liveMatches = await matchService.fetchLiveMatches(offset);
  
      console.log('Live matches:', liveMatches);
      res.json(liveMatches);
    } catch (error) {
      console.error('Error fetching live matches:', error.message);
      res.status(500).json({ msg: 'Failed to fetch live matches', error: error.message });
    }
  });

// @route   GET /api/matches/:id
// @desc    Get match details by ID
// @access  Public  
router.get('/:id', async (req, res) => {
  try {
    const matchId = req.params.id;

    // Make a request to CricAPI to get match details
    const response = await axios.get(`https://cricapi.com/api/cricketScore?apikey=${CRIC_API_KEY}&unique_id=${matchId}`);

    // Send the match details as a response
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching match details:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;