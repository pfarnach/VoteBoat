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
			defaultValue: 'ACTIVE'
    }
  }, {
    tableName: 'poll_options'
  });

  return pollOption;
}

module.exports = pollOptionModel;
