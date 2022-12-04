const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "rm75zt",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
