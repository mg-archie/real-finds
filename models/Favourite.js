const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Favourites extends Model {}

Favourites.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      references: {
        model: 'user',
        id: 'id',
      }
    },
    listing_id: {
      references: {
        model: 'listing',
        id: 'id',
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'favourites'
  }
);

module.exports = Favourites;