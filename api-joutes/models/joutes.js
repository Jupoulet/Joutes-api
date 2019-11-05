module.exports = (sequelize, DataTypes) => {
  const { Sequelize } = sequelize;
  const Joutes = sequelize.define('joutes', {
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    score: {
      type: DataTypes.JSON
    },
  }, {
    tableName: 'joutes',
    underscored: true,
    timestamps: false,
    schema: process.env.DATABASE_SCHEMA,
  });

  Joutes.associate = (models) => {
    Joutes.belongsTo(models.players, {
      foreignKey: {
        name: 'loserId',
        field: 'loser_id',
      },
      as: 'loser',
    });
    Joutes.belongsTo(models.players, {
      foreignKey: {
        name: 'winnerId',
        field: 'winner_id',
      },
      as: 'winner',
    });
  };

  return Joutes;
};

