"use strict";

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        username: faker.internet.userName(),
        title: faker.person.jobTitle(),
        about: faker.lorem.paragraph(),
        posts_count: faker.number.int({ min: 0, max: 20 }),
        followers_count: faker.number.int({ min: 0, max: 500 }),
        following_count: faker.number.int({ min: 0, max: 200 }),
        likes_count: faker.number.int({ min: 0, max: 1000 }),
        address: faker.location.streetAddress() + ", " + faker.location.city(),
        website_url: faker.internet.url(),
        twitter_url: "https://twitter.com/" + faker.internet.userName(),
        github_url: "https://github.com/" + faker.internet.userName(),
        linkedin_url: "https://linkedin.com/in/" + faker.internet.userName(),
        verified_at: faker.datatype.boolean() ? faker.date.past() : null,
        last_login: faker.date.recent(),
        created_at: faker.date.past(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert("users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
