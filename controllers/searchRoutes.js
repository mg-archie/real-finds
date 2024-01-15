const router = require('express').Router();
const { User, Agent, Listing } = require('../models');

// Search route
router.get('/', async (req, res) => {
  try {
    const { query } = req.query;

    let searchResults;

    if (query) {
      // If the query is not empty, perform the search logic based on the query parameter
      searchResults = await performSearch(query);
    } else {
      // If the query is empty, retrieve all listings (modify this logic based on your database schema)
      searchResults = await Listing.findAll();
    }

    // Render the search page with the search results
    res.render('search', { searchResults, });
  } catch (err) {
    console.log(err)
    console.error(err);
    res.status(500).json(err);
  }
});

// Function to perform the search logic
async function performSearch(query) {
  // Perform your search logic here based on the query parameter
  // For example, you can search for listings or agents that match the query
  // Return the search results
}

module.exports = router;
