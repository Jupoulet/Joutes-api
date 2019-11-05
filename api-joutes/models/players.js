module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  const Players = sequelize.define('players', {
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'players',
    timestamps: false,
    schema: process.env.DATABASE_SCHEMA,
  });

  Players.associate = (models) => {
  };

  return Players;
};

