"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      this.hasMany(models.Ingredient, {
        foreignKey: "food_id",
      });
      this.hasMany(models.Recipe, {
        foreignKey: "food_id",
      });
      this.belongsToMany(models.User, {
        through: models.Likes,
        as: "counted",
        foreignKey: "food_id",
      });
    }
  }
  Food_info.init(
    {
      food_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      food_name: DataTypes.STRING,
      summary: DataTypes.STRING,
      nation: DataTypes.STRING,
      type: DataTypes.STRING,
      cooking_time: DataTypes.STRING,
      calorie: DataTypes.STRING,
      qnt: DataTypes.STRING,
      level: DataTypes.STRING,
      irdnt_code: DataTypes.STRING,
      price: DataTypes.STRING,
      food_img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Food_info",
    }
  );
  return Food_info;
};
