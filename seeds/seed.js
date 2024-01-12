const sequelize = require('../config/connection');
const { User, Agent, Listing, Favourite } = require('../models');

const userData = require('./userData.json');
const agentData = require('./agentData.json');
const listingData = require('./listingData.json');
const favouriteData = require('./favouriteData.json');

const seedDatabase = async () => { 
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  for (const favourite of favouriteData) {
    await Favourite.create({
      ...favourite,
      user_id: users[Math.floor(Math.random() * users.length)].id, // have to figure out how to add listings to 
    });
  }

  const agents = await Agent.bulkCreate(agentData, {
    individualHooks: true,
    returning: true,
  });

  for (const listing of listingData) {
    await Listing.create({
      ...listing,
      agent_id: agents[Math.floor(Math.random() * agents.length)].id,
    });
    
  }
  process.exit();
};

seedDatabase();