const User = require('./User');
const Agent = require('./Agent');
const Listing = require('./Listing');

User.hasMany(Listing, {
  foreignKey: 'favourite',
  isUnique: false, // users and agents will have same listings in many cases
});

Agent.hasMany(Listing, {
  foreignKey: 'active_listings',
  isUnique: false, // users and agents will have same listings in many cases
});

Listing.hasOne(Agent, {
  foreignKey: 'agent_id',
  isUnique: true,
});

module.exports = { User, Agent, Listing };
