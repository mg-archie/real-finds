const router = require('express').Router();
// will need to rename these once created
const { User, Agent, Listing, Location  } = require('../models');














// get one listing
// user click will replace the :id, will render/send them to the individual listing page
router.get('/listing/:id', async (req, res) => {
    try {
      const dbListingData = await Listing.findByPk(req.params.id);
  
      const listing = dbListingData.get({ plain: true });
  
      res.render('listing', { listing });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// get a realtor profile
// user click will replace the :id, will render/send them to the individual realtor page
router.get('/agent/:id', async (req, res) => {
    try {
      const dbAgentData = await Agent.findByPk(req.params.id);
  
      const agent = dbAgentData.get({ plain: true });
  
      res.render('agent', { agent });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;