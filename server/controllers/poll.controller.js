const { poll: Poll, pollOption: PollOption } = require('../models');

function create(req, res) {
  const { user, body: { title, description, pollOptions }} = req;

  // Create poll, bulk create poll options, and then return poll and poll options
  Poll.create({
    title,
    description,
    userId: (user && user.id) ? user.id : null
  }).then(newPoll => {
    const options = pollOptions.map(pollOption => ({ title: pollOption, pollId: newPoll.get('id') }));
    return Promise.all([PollOption.bulkCreate(options), newPoll]);
  }).then(resp => {
    const poll = resp[1];
    const query = {
      where: {
        id: poll.id
      },
      include: [{ model: PollOption }]
    };

    return Poll.findOne(query);
  }).then(newPoll => {
    res.status(201).json(newPoll);
  }).catch(err => {
    console.error(err);
    res.status(400).send({ msg: 'Failed to create poll' });
  });
}

// Fetch polls for a given user and include poll options
function getPollsByUser(req, res) {
  const { user } = req;

  const query = {
    where: {
      userId: user.id
    },
    include: [PollOption]
  };

  Poll.findAll(query).then(polls => {
    res.json(polls);
  }).catch(() => {
    res.status(400).send({ msg: 'Error fetching user\'s polls' });
  });
}

module.exports = {
  create,
  getPollsByUser
};