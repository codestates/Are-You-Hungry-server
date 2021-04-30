'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Ingredient.init({
    igr_id: DataTypes.INTEGER,
    food_id: DataTypes.INTEGER,
    type_id: DataTypes.INTEGER,
    cap_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};