const router = require('express').Router();
const { User, Agent, Listing, Location } = require('../models');

// Search route
router.get('/', async (req, res) => {
    try {
      const { query } = req.query;
  
      // Perform the search logic based on the query parameter
      const searchResults = await performSearch(query);
  
      // Render the search page with the search results
      res.render('search', { searchResults, logged_in: req.session.logged_in });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });
  
  // Function to perform the search logic
  async function performSearch(query) {
    // search logic here based on the query parameter
    // ex, search for listings or agents that match the query
    // Return the search results
  }
  
  module.exports = router;