"use strict";

/** @type {import('sequelize-cli').Migration} */

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        first_name: faker.person.fullName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        gender: faker.helpers.arrayElement(["male", "female", "other"]),
        birth_date: faker.date.past(30),
        avatar: faker.image.avatar(),
        verified_at: new Date(),
        last_login: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert("users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
