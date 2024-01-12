const sequelize = require('../config/connection');
const { User, Agent, Listing, Favourite } = require('../models');

const userData = require('./userData.json');
const agentData = require('./agentData.json');
const listingData = require('./listingData.json');
const favouriteData = require('./favouriteData.json');

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const agents = await Agent.bulkCreate(agentData, {
    individualHooks: true,
    returning: true,
  });

  for (const agent of agents) {
    const numListings = getRandomInt(1, 5);
    
    for (let i = 0; i < numListings; i++) {
      await Listing.create({
        ...listingData[Math.floor(Math.random() * listingData.length)],
        agent_id: agent.id,
      });
    }
  }

  for (let user of users) {
    const numFavourites = getRandomInt(1, 5);

    for (let i = 0; i < numFavourites; i++) {
      const randomListing = await Listing.findOne({
        order: sequelize.random(),
      });
      await Favourite.create({
        user_id: user.id,
        listing_id: randomListing.id
      });
    }
  }

  process.exit();
};

seedDatabase();