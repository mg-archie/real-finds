const router = require('express').Router();
const { Agent } = require('../../models');
const withAuth = require('../../utils/auth');

//Create agent and session
router.post('/', async (req, res) => {
  try {
    const agentData = await Agent.create(req.body);

    req.session.save(() => {
      req.session.agent_id = agentData.id;
      req.session.logged_in = true;

      res.status(200).json(agentData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all agents
router.get('/', async (req, res) => {
  try {
      const agentData = await Agent.findAll();
      res.status(200).json(agentData);
  } catch (err) {
      res.status(500).json(err);
  }
})

// GET agent by id
router.get('/:id', async (req, res) => {
  try {
    const agentData = await Agent.findByPk(req.params.id);
    if (!agentData) {
      res.status(404).json({ message: 'No agent found.' });
      return;
    }
    res.status(200).json(agentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN 
router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const agentData = await Agent.findOne({ where: { email: req.body.email } });
    if (!agentData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await agentData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.agent_id = agentData.id;
      req.session.logged_in = true;
      
      res.json({ agent: agentData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

