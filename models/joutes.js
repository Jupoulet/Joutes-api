'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const joutes = sequelize.define('joutes', {
    score: DataTypes.JSON
  }, {});
  joutes.associate = function(models) {
    // associations can be defined here
    joutes.belongsTo(models.players, {
      as: 'winner',
      foreignKey: 'winner_id'
    })
    joutes.belongsTo(models.players, {
      as: 'loser',
      foreignKey: 'loser_id'
    })
  };
  return joutes;
};