const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Listing extends Model {}

Listing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('address', value.toLowerCase());
      }
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('postal_code', value.toLowerCase());
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('city', value.toLowerCase());
      }
    },
    listing_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sqft: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    baths: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'listing',
  }
);

module.exports = Listing;
