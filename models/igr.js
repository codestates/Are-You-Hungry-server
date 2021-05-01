"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Igr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Ingredient, {
      //   foreignKey: "igr_id",
      // });
    }
  }
  Igr.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Igr",
    }
  );
  return Igr;
};
