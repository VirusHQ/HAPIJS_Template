'use strict';

const JsonWebToken = require('jsonwebtoken');
const config = require('../config/config.js');

const people = { // our "users database"
  1: {
    id: 1,
    name: 'Jen Jones'
  }
};

module.exports = {
  serverInfo: async () => {
    var token = JsonWebToken.sign(people[1], config.jwtSecret);
    return {
      epochtime: new Date().getTime(),
      token
    };
  }
};