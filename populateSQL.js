/* eslint-disable no-undef */
'use strict';

const Sequelize = require('sequelize');
const config = require('./config/config.js');

// Configure Sequelize for ORM Database
let sequelize;
console.log(config.database);
sequelize = new Sequelize(config.database.database, config.database.username, config.database.password, config.database);

sequelize.authenticate().then(function() {
  console.log('Database connected to database.');

  for (var i = 0; i < 1000; i++) {
    let n = (Math.random() + 1).toString(36).substring(2) + (Math.random() + 1).toString(36).substring(2);
    let u = (Math.random() + 1).toString(36).substring(2) + '/' + (Math.random() + 1).toString(36).substring(3);
    let ut = (Math.random() + 1).toString(36).substring(2) + '/' + (Math.random() + 1).toString(36).substring(4) + '/' + (Math.random() + 1).toString(36).substring(4);
    let p = Math.random() * 10;
    let v = Math.floor(Math.random() * 100);

    console.log(n, u, ut, Math.floor(p) % 2, v);

    sequelize.query('INSERT INTO `videos` (`name`, `url`, `thumbnailUrl`, `isPrivate`, `timesViewed`) VALUES (?, ?, ?, ?, ?)', {
      type: sequelize.QueryTypes.INSERT,
      replacements: [
        n, u, ut, Math.floor(p) % 2, v
      ]
    });
  }
  sequelize.close();

}).catch(function(err) {
  console.log('Database connection failed for database');
  console.log(config.database);
  console.log(err);
});