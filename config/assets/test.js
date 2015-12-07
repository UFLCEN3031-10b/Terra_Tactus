'use strict';

module.exports = {
  tests: {
    client: ['modules/*/tests/client/**/*.js'],
    // server: ['modules/*/tests/server/**/*.js'],
    server: ['modules/core/tests/server/**/*.js'],
    e2e: ['modules/*/tests/e2e/**/*.js']
  }
};
