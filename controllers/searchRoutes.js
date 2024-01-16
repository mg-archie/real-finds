const router = require('express').Router();
const { Listing } = require('../models');
const { Op } = require('sequelize');

// search function logic
router.get('/', async (req, res) => {
  try {
    const { query, baths, rooms, type, city } = req.query;

    let searchConditions = {};
    if (query) {
      searchConditions.address = { [Op.like]: `%${query.toLowerCase()}%` };
    }
    // Add conditions for city, baths, rooms, and type if they are not empty
    if (city && city !== '') {
      searchConditions.city = city;
    }

    // Handle "1+", "2+", "3+", "4+", and "5+" options for bedrooms
    if (rooms && rooms !== '') {
      if (rooms === "5+") {
        searchConditions.rooms = { [Op.gte]: 5 };
      } else {
        const roomCount = parseInt(rooms, 10);
        searchConditions.rooms = { [Op.gte]: roomCount };
      }
    }

    // Handle "1+", "2+", "3+", "4+", and "5+" options for bathrooms
    if (baths && baths !== '') {
      if (baths === "5+") {
        searchConditions.baths = { [Op.gte]: 5 };
      } else {
        const bathCount = parseInt(baths, 10);
        searchConditions.baths = { [Op.gte]: bathCount };
      }
    }

    if (type && type !== '') {
      searchConditions.listing_type = type;
    }

    let searchResults = await Listing.findAll({
      where: searchConditions
    });
    const cleanSearchResults = searchResults.map((listing) => listing.get({ plain: true }));

    console.log('======================================',cleanSearchResults);

    res.render('search', { cleanSearchResults });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// loads listing page on a clicked listing
router.get('/listing/:id', async (req, res) => {
  try {
    const listingData = await Listing.findByPk(req.params.id, {
      include: [
        {
          model: Agent,
          attributes: ['name', 'brokerage'],
        },
      ]
    });

    const listing = listingData.get({ plain: true });
    console.log('======================================',listing);
    res.render('listing', listing);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;