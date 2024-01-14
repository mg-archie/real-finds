const { Agent } = require('../models/index.js')
const agentData = [
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepass",
    "brokerage": "ABC Realty",
    "active_listings": 1
  },
  {
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "password": "pass1234",
    "brokerage": "XYZ Properties",
    "active_listings": 2
  },
  {
    "name": "Mike Johnson",
    "email": "mike.johnson@example.com",
    "password": "a1b2c3",
    "brokerage": "123 Realty Group",
    "active_listings": 3
  },
  {
    "name": "Emily Davis",
    "email": "emily.davis@example.com",
    "password": "davis2022",
    "brokerage": "Main Street Realtors",
    "active_listings": 4
  },
  {
    "name": "Alex Turner",
    "email": "alex.turner@example.com",
    "password": "agentpass",
    "brokerage": "Cityscape Properties",
    "active_listings": 5
  }
]
const agentSeeds = () => Agent.bulkCreate(agentData, {
  individualHooks: true,
  returning: true,
});
module.exports = agentSeeds;