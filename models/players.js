'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const players = sequelize.define('players', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {});
  players.associate = function(models) {
    // associations can be defined here
  };
  return players;
};