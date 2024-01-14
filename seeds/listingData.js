const { Listing } = require('../models/index.js')
const listingData = [
  {
    "price": 500000,
    "date_created": "2023-01-01",
    "address": "123 Main St",
    "postal_code": "M5V 2J4",
    "city": "Toronto",
    "listing_type": "House",
    "rooms": 4,
    "baths": 2,
  },
  {
    "price": 700000,
    "date_created": "2023-02-15",
    "address": "456 Oak St",
    "postal_code": "M4H 1N7",
    "city": "Toronto",
    "listing_type": "Condo",
    "rooms": 2,
    "baths": 1,
  },
  {
    "price": 800000,
    "date_created": "2023-03-20",
    "address": "789 Maple Ave",
    "postal_code": "M6G 1P1",
    "city": "Toronto",
    "listing_type": "Condo",
    "rooms": 3,
    "baths": 2,
  },
  {
    "price": 600000,
    "date_created": "2023-04-10",
    "address": "101 Pine Blvd",
    "postal_code": "M2N 2S6",
    "city": "Toronto",
    "listing_type": "House",
    "rooms": 5,
    "baths": 3,
  },
  {
    "price": 900000,
    "date_created": "2023-05-05",
    "address": "202 Cedar Ln",
    "postal_code": "M1P 3Y5",
    "city": "Toronto",
    "listing_type": "Condo",
    "rooms": 3,
    "baths": 2,
  }
]
const seedListing = () => Listing.bulkCreate(listingData);
module.exports = seedListing;
