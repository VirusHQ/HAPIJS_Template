const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Jwt = require('../lib');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');
const Routes = require('../config/routes');
const config = require('../config/config.js');
const Qs = require('qs');
require('dotenv').config();

const people = { // our "users database"
  1: {
    id: 1,
    name: 'Jen Jones'
  }
};

const validate = async function(decoded, request, h) {
  if (!people[decoded.id]) {
    return {
      isValid: false
    };
  } else {
    return {
      isValid: true
    };
  }
};

const server = new Hapi.Server({
  port: process.env.PORT || 3000,
  query: {
    parser: (query) => Qs.parse(query)
  }
});

// Export function so we can run tests on it
exports.init = async () => {
  const swaggerOptions = {
    schemes: ['https', 'http'],
    info: {
      title: 'Hapi Tempelate',
      version: Pack.version,
      description: 'API access to the template.'
    },
    securityDefinitions: { // Define Hapi Swagger Authentication Window
      'jwt': {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    security: [{
      jwt: [] // Must be here for Authorization headers to be sent in Swagger
    }]
  };

  try {
    await server.register([
      Inert,
      Vision,
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      },
      Jwt
    ]);
  } catch (err) {
    console.trace(err);
  }

  try {
    server.auth.strategy('jwt', 'jwt', {
      key: config.jwtSecret,
      validate: validate,
      verifyOptions: {
        ignoreExpiration: false
      }
    });

    server.auth.default('jwt');
  } catch (err) {
    console.trace(err);
  }

  server.route(Routes);

  await server.initialize();
  return server;
};

// Export start so we can run tests on it
exports.start = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  console.log(`Documentation running at: ${server.info.uri}/documentation`);
  return server;
};

exports.stop = async () => {
  await server.stop();
};