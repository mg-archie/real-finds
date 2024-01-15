const router = require('express').Router();
const { User, Agent, Listing, } = require('../models');
const withAuth = require('../utils/auth');

// home route
router.get('/', async (req, res) => {
  try {
    // Fetch latest 3 listings and agents data from the database
    const listingData = await Listing.findAll({
      limit: 7, // Limit to 3 listings
      order: [['date_created', 'DESC']], // Sort by date_created in descending order
    });
    const agentData = await Agent.findAll();

    // Serialize data so the template can read it
    const listings = listingData.map((listing) => listing.get({ plain: true }));
    const agents = agentData.map((agent) => agent.get({ plain: true }));

    // Render the home page with the fetched data and a session flag indicating the user is logged in
    res.render('homepage', { listings, agents, logged_in: req.session.logged_in });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// get one listing
// user click will replace the :id, will render/send them to the individual listing page
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

// get a realtor profile
// user click will replace the :id, will render/send them to the individual realtor page
router.get('/agent/:id', async (req, res) => {
  try {
    const agentData = await Agent.findByPk(req.params.id);

    const agent = agentData.get({ plain: true });

    res.render('agent', { agent });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
// userts will be routed to profiles where it shows their infor and can edit their info
// agents on the otherhand shoudl be shown to thier profile and display the same edit stuff but shoudl be able to see thier ective listings 
router.get('/profile', withAuth, async (req, res) => {
  console.log(req.session)
  try {
    if (req.session.user_type === 'user') {
      // Find the logged-in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
      });

      const user = userData.get({ plain: true });

      res.render('profile', {
        ...user,
        logged_in: true,
        isAgent: false,
      });
    } else if (req.session.user_type === 'agent') {
      const agentData = await Agent.findByPk(req.session.agent_id, {
        attributes: { exclude: ['password'] },
      });

      const agent = agentData.get({ plain: true });

      res.render('profile', {
        ...agent,
        logged_in: true,
        isAgent: true,
      });
    } else {
      res.status(403).send("Unauthorized access");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
