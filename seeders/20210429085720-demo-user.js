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
    await queryInterface.bulkInsert("Users", [
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
    await queryInterface.bulkInsert(
      "Likes",
      [
        {
          food_id: 10,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          food_id: 15,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          food_id: 20,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          food_id: 11,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          food_id: 100,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          food_id: 300,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Likes", null, {});
  },
};
