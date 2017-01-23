const { pollTypes, status } = require('../keywords');

function pollModel(sequelize, DataTypes) {
  const poll = sequelize.define('poll', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 200]
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 1000]
      }
    },
    pollType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [[pollTypes.fptp, pollTypes.approval, pollTypes.ranked]]
      }
    },
    allowMultiVote: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
    tableName: 'polls',
    classMethods: {
      associate(models) {
        poll.belongsTo(models.user);
        poll.hasMany(models.pollOption);
      }
    }
  });

  return poll;
}

module.exports = pollModel;
