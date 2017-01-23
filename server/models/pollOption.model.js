const { status } = require('../keywords');

function pollOptionModel(sequelize, DataTypes) {
  const pollOption = sequelize.define('pollOption', {
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
    tableName: 'poll_options',
    classMethods: {
      associate(models) {
        pollOption.hasMany(models.vote);
      }
    }
  });

  return pollOption;
}

module.exports = pollOptionModel;
