const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // URL 
    baseUrl: "https://with-bugs.practicesoftwaretesting.com",
    
    // estabilidad
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,


    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

