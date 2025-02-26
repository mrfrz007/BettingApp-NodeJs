const axios = require("axios");
require("dotenv").config();

const CRIC_API_KEY = process.env.CRIC_API_KEY;

// Fetch live matches from CricAPI
const fetchLiveMatches = async (offset = 0) => {
  try {
    const response = await axios.get(
      `https://api.cricapi.com/v1/currentMatches?apikey=${CRIC_API_KEY}&offset=${offset}`
    );
    console.log(response);
    // Validate API response
    if (!response.data || !response.data.data) {
      throw new Error("Invalid API response");
    }

    // Filter only live matches
    const liveMatches = response.data.data.filter(
      (match) => match.matchStarted
    );

    return liveMatches;
  } catch (error) {
    console.error("Error fetching live matches:", error.message);
    throw error;
  }
};

module.exports = {
  fetchLiveMatches,
};
