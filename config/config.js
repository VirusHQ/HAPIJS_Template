/* eslint-disable no-undef */
'use strict';

require('dotenv').config(); // this is important!

module.exports = {
  'jwtSecret': process.env.JWT_SECRET,
  'database': {
    'username': process.env.DB_USERNAME,
    'password': process.env.DB_PASSWORD,
    'port': process.env.DB_PORT,
    'host': process.env.DB_HOST,
    'database': process.env.DB_NAME,
    'dialect': 'mysql',
    'logging': false
  }
};