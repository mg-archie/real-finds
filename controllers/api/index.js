const router = require('express').Router();
const listingRoutes = require('./listingRoutes');
const userRoutes = require('./userRoutes');
const agentRoutes = require('./agentRoutes');

router.use('/listing', listingRoutes);
router.use('/users', userRoutes);
router.use('/agent', agentRoutes);

module.exports = router;