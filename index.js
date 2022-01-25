'use strict';
const { init, start } = require('./server');

async function startServer() {
  // Await server initialization first so it loads all registries
  await init();
  // Start server
  start();
}

// Start server via node .
startServer();