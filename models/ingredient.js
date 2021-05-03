"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Food_info, {
        foreignKey: "food_id",
      });
    }
  }
  Ingredient.init(
    {
      food_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      cap: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Ingredient",
    }
  );
  return Ingredient;
};
