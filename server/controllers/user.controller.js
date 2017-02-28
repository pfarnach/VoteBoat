const { pick } = require('lodash');
const { user: User, poll: Poll } = require('../models');

function userInfo(req, res) {
  // Include user's polls
  const query = {
    where: {
      id: req.user.id
    },
    include: [Poll]
  };

  User.findOne(query).then(user => {
    const data = pick(user, ['id', 'email', 'createdAt', 'updatedAt', 'polls']);
    res.status(200).json(data);
  });
}

module.exports = {
  userInfo
};