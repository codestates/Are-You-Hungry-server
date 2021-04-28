"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Food_infos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      food_name: {
        type: Sequelize.STRING,
      },
      summary: {
        type: Sequelize.STRING,
      },
      nation_id: {
        type: Sequelize.INTEGER,
      },
      type_id: {
        type: Sequelize.INTEGER,
      },
      cooking_time: {
        type: Sequelize.STRING,
      },
      calorie: {
        type: Sequelize.STRING,
      },
      qnt: {
        type: Sequelize.STRING,
      },
      level: {
        type: Sequelize.STRING,
      },
      irdnt_code: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      food_img: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Food_infos");
  },
};
