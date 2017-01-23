const { pollTypes } = require('../keywords');
const { poll: Poll, pollOption: PollOption, vote: Vote } = require('../models');

function create(req, res) {
  const { user, body: { title, description, pollType, pollOptions }} = req;

  if (!_isPollOptionsValid(pollOptions)) {
    return res.status(400).send('Must include at least two valid poll options.');
  }

  const allowMultiVote = pollType === pollTypes.ranked || pollType === pollTypes.approval;

  // Create poll, bulk create poll options, and then return poll and poll options
  Poll.create({
    title,
    description,
    pollType,
    allowMultiVote,
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
      include: [PollOption]
    };

    return Poll.findOne(query);
  }).then(newPoll => {
    res.status(201).json(newPoll);
  }).catch(() => {
    res.status(400).send('Failed to create poll');
  });
}

function _isPollOptionsValid(pollOptions) {
  if (pollOptions && pollOptions.length < 2) {
    return false;
  }

  return pollOptions.every(option => typeof option === 'string' && option.length >= 1);
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
    res.status(400).send('Error fetching user\'s polls');
  });
}

function getPollById(req, res) {
  const { pollId } = req.params;

  const query = {
    where: {
      id: pollId
    },
    include: [PollOption]
  };

  Poll.findOne(query).then(poll => {
    if (!poll) {
      return res.status(400).send('No poll with ID ' + pollId);
    }

    res.json(poll);
  });
}

// TODO: Figure out data format to use for results
function getPollResults(req, res) {
  const { params: { pollId }} = req;

  // TODO: Handle all 3 types of polls and move logic out to utils
  const query = {
    where: {
      id: pollId
    },
    include: [{
      model: PollOption,
      include: [Vote]
    }]
  };

  Poll.findOne(query).then(poll => {
    if (!poll) {
      return res.status(400).send('No poll with ID ' + pollId);
    }

    const voteCount = poll.pollOptions.reduce((acc, option) => {
      acc[option.id] = option.votes.length;
      return acc;
    }, {});

    res.json(voteCount);
  }).catch(err => {
    console.error(err);
    res.status(500).send('Error calculating results');
  });
}

module.exports = {
  create,
  getPollById,
  getPollsByUser,
  getPollResults
};