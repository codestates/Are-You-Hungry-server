"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        password: "test",
        password2: "test1",
        email: "are@you.hungry",
        phone: "000-0000-0000",
        userimage: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "public_data_portal",
        password: "test",
        password2: "test1",
        email: "are@you.hungry",
        phone: "000-0000-0000",
        userimage: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
