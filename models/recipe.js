'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Recipe.init({
    food_id: DataTypes.INTEGER,
    cooking_no: DataTypes.INTEGER,
    cooking_dc: DataTypes.STRING,
    step_img: DataTypes.STRING,
    step_tip: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};