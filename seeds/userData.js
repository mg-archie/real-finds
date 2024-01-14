const { User } = require('../models/index.js')
const userData = [
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "favourite": 1
  },
  {
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "password": "securepass",
    "favourite": 2
  },
  {
    "name": "Bob Johnson",
    "email": "bob.johnson@example.com",
    "password": "pass1234",
    "favourite": 2
  },
  {
    "name": "Alice Brown",
    "email": "alice.brown@example.com",
    "password": "a1b2c3",
    "favourite": 3
  },
  {
    "name": "Charlie Davis",
    "email": "charlie.davis@example.com",
    "password": "davis2022",
    "favourite": 5
  }
]
const userSeeds = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});
module.exports = userSeeds;
 