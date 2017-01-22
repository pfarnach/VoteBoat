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
    status: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'ACTIVE'
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
