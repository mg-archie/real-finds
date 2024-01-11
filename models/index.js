const User = require('./User');
const Agent = require('./Agent');
const Listing = require('./Listing');
const Location = require('./Location');

User.hasMany(Listing, {
  foreignKey: 'listing_id',
  isUnique: false, // users and agents will have same listings in many cases
});

Agent.hasMany(Listing, {
  foreignKey: 'listing_id',
  isUnique: false, // users and agents will have same listings in many cases
});

Listing.hasOne(Agent, {
  foreignKey: 'agent_id',
  isUnique: true,
});

Listing.hasOne(Location, {
  foreignKey: 'location_id',
  inUnique: false, // multiple listings can have same location
})

Location.hasMany(Listing, {
  foreignKey: 'listing_id',
  isUnique: false, // location can have many 
});

module.exports = { User, Agent, Listing, Location };