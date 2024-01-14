const sequelize = require('../config/connection');
// const { User, Agent, Listing, Favourite } = require('../models');

const userSeeds = require('./userData');
const agentSeeds = require('./agentData');
const seedListing = require('./listingData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedListing();
  await agentSeeds();
  await userSeeds();

  process.exit();
};

seedDatabase();