'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Igr_cap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Igr_cap.init({
    cap: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Igr_cap',
  });
  return Igr_cap;
};