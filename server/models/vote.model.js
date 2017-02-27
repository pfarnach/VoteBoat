const { status } = require('../keywords');

function voteModel(sequelize, DataTypes) {
  const vote = sequelize.define('vote', {
    // In case this is a vote for a scored poll
    score: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 4
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: status.active,
      validate: {
        isIn: [[status.active, status.deleted, status.closed]]
      }
    }
  }, {
    tableName: 'votes',
    classMethods: {
      associate(models) {
        vote.belongsTo(models.user);
        vote.belongsTo(models.pollChoice);
      }
    }
  });

  return vote;
}

module.exports = voteModel;
