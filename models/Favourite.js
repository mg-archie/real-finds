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
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    listing_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'listing',
        key: 'id',
      }
    },
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
