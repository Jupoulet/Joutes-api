'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'joutes',
        'winner_id',{
          type: Sequelize.INTEGER,
          references: {
            model: 'players',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      ),
      queryInterface.addColumn(
        'joutes',
        'loser_id',{
          type: Sequelize.INTEGER,
          references: {
            model: 'players',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    ])
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'joutes',
        'winner_id'
      ),
      queryInterface.removeColumn(
        'joutes',
        'loser_id'
      )
    ])
  }
};
