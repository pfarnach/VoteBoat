const { get } = require('lodash');

const { pollTypes } = require('../keywords');
const { results } = require('../utils');
const { poll: Poll, pollChoice: PollChoice, vote: Vote } = require('../models');

function create(req, res) {
  const { user, body: { title, description, endTime, pollType, pollChoices }} = req;

  if (!_isPollChoicesValid(pollChoices)) {
    return res.status(400).send('Must include at least two valid poll choices.');
  }

  const allowMultiVote = pollType === pollTypes.scored || pollType === pollTypes.approval;

  // Create poll, bulk create poll choice, and then return poll and poll choice
  Poll.create({
    title,
    description,
    pollType,
    allowMultiVote,
    endTime,
    userId: get(user, 'id')
  }).then(newPoll => {
    const choice = pollChoices.map(pollChoice => ({ title: pollChoice, pollId: newPoll.get('id') }));
    return Promise.all([PollChoice.bulkCreate(choice, { validate: true }), newPoll]);
  }).then(resp => {
    const poll = resp[1];
    const query = {
      where: {
        id: poll.id
      },
      include: [PollChoice]
    };

    return Poll.findOne(query);
  }).then(newPoll => {
    res.status(201).json(newPoll);
  }).catch(() => {
    res.status(400).send('Failed to create poll');
  });
}

function _isPollChoicesValid(pollChoices) {
  if (pollChoices && pollChoices.length < 2) {
    return false;
  }

  return pollChoices.every(choice => typeof choice === 'string' && choice.length >= 1);
}

// Fetch polls for a given user and include poll choices
function getPollsByUser(req, res) {
  const { user } = req;

  const query = {
    where: {
      userId: user.id
    },
    include: [PollChoice]
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
    include: [PollChoice]
  };

  Poll.findOne(query).then(poll => {
    if (!poll) {
      return res.status(400).send('No poll with ID ' + pollId);
    }

    res.json(poll);
  });
}

function getPollResults(req, res) {
  const { params: { pollId }} = req;
  const query = {
    where: {
      id: pollId
    },
    include: [{
      model: PollChoice,
      include: [Vote]
    }]
  };

  Poll.findOne(query).then(poll => {
    if (!poll) {
      return res.status(400).send('No poll with ID ' + pollId);
    }

    const pollResults = results.countResults(poll);
    res.json(pollResults);
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
