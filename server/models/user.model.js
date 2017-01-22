const bcrypt = require('bcrypt-nodejs')

function userModel(sequelize, DataTypes) {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      },
      set(val) {
        this.setDataValue('email', val.toLowerCase())
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
	      len: [6, 100]
      }
    },
    authMethod: {
			type: DataTypes.STRING,
			allowNull: false,
      defaultValue: 'LOCAL'
    },
    status: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'ACTIVE'
    }
  }, {
    tableName: 'users',
    instanceMethods: {
      comparePasswords(candidatePassword, cb) {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
          if (err) {
            return cb(err);
          }

          cb(null, isMatch);
        });
      }
    }
  });

  user.beforeCreate(hashPasswordHook);
  user.beforeUpdate(hashPasswordHook);

  return user;
}

function hashPasswordHook(user, options, cb) {
  if (!user.changed('password')) {
    return cb(null, options);
  }

  // generate salt
  return bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return cb(err);
    }

    // hash raw password with salt
    return bcrypt.hash(user.get('password'), salt, null, (err, hash) => {
      if (err) {
        return cb(err);
      }

      user.password = hash;
      cb(null, options);
    });
  });
}

module.exports = userModel;
