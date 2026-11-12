const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://with-bugs.practicesoftwaretesting.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    defaultCommandTimeout: 15000,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
