const { status } = require('../keywords');

function voteModel(sequelize, DataTypes) {
  const vote = sequelize.define('vote', {
    // In case this is a vote for a ranked poll
    rank: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1
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
        vote.belongsTo(models.pollOption);
      }
    }
  });

  return vote;
}

module.exports = voteModel;
