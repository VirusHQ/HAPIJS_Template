/* eslint-disable no-undef */
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config.js');
const db = {};

// Configure Sequelize for ORM Database
let sequelize;
console.log(config.database);
sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, config.database);

sequelize.authenticate().then(function() {
  console.log('Database connected to database.');
}).catch(function(err) {
  console.log('Database connection failed for database');
  console.log(config.database);
  console.log(err);
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
