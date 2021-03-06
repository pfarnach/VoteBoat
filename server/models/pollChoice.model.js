const { status } = require('../keywords');

function pollChoiceModel(sequelize, DataTypes) {
  const pollChoice = sequelize.define('pollChoice', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 400]
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
    tableName: 'poll_choices',
    classMethods: {
      associate(models) {
        pollChoice.hasMany(models.vote);
      }
    }
  });

  return pollChoice;
}

module.exports = pollChoiceModel;
