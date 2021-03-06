"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Food_info, {
        foreignKey: "user_id",
      });
      this.hasMany(models.Food_info, {
        foreignKey: "user_id",
      });
      this.belongsToMany(models.Food_info, {
        through: models.Likes,
        as: "liked",
        foreignKey: "user_id",
      });
      // define association here
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      password2: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      userimage: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
