'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Igr_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Igr_type.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Igr_type',
  });
  return Igr_type;
};