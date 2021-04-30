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
        password:
          "sNA68Sv3Zo1trETikBL/YlGAhubwWgol8lYUnjSjkKRmbzQVTQAjyVJvH/HaOscjBc+18MawBufAm74mfmxdGA==", //test
        password2:
          "+fWX+RzVf+NPE1wLE8nyDCgV1nzS28lwyBapt5Dvx6JUmSpiyeZjoR0U1H+3XhurKJ66FMJn1uQSoN5zLK39tw==",
        email: "are@you.hungry",
        phone: "000-0000-0000",
        userimage: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "public_data_portal",
        password:
          "sNA68Sv3Zo1trETikBL/YlGAhubwWgol8lYUnjSjkKRmbzQVTQAjyVJvH/HaOscjBc+18MawBufAm74mfmxdGA==", //test
        password2:
          "+fWX+RzVf+NPE1wLE8nyDCgV1nzS28lwyBapt5Dvx6JUmSpiyeZjoR0U1H+3XhurKJ66FMJn1uQSoN5zLK39tw==",
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
