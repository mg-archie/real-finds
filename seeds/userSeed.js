
/*const sequelize = require('../config/connection');
const { User } = require('../models');
const { faker } = require('@faker-js/faker');




const seed = async () => {
  try {
    await sequelize.sync({ force: false })
    
    // Declare a variable and set it equal to an array. 
    let users = []
    
    // This for loop decides how many datapoints you will create.
    // If you want to change the amount, just change the number in the for loop!
    for (let i = 0; i < 50; i++) {
      const name = faker.person.fullName();
      
      // The keys in this user object are set equal to the fake information
      let newUser = {
        name: name,
        username: faker.internet.userName(),
        email: faker.internet.email(name).toLowerCase(),
        password: faker.internet.password(),
      }
      
      // For each fake user you create, you're going to push them into the user array you declare above
      users.push(newUser)
    }
    console.log(users);

    // For each user in the array, you are going to create a new user instance in the database
    users.forEach(async (user) => {
      await User.create(user)
      
    })

   } catch(err) {
      console.log(err)
   }};

   seed();*/