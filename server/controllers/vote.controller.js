const { get } = require('lodash');
const { pollTypes } = require('../keywords');

const {
  poll: Poll,
  pollOption: PollOption,
  vote: Vote
} = require('../models');

function castVote(req, res) {
  const { user, body: { votes }} = req;

  const votesToMake = votes.map(vote => {
    return {
      score: vote.score,
      pollOptionId: vote.pollOptionId,
      userId: get(user, 'id', null)
    };
  });

  Vote.bulkCreate(votesToMake, { validate: true }).then(() => {
    res.status(201).send('Vote successfully cast.');
  }).catch(() => {
    res.status(500).send('Error casting vote.');
  });
}

// TODO: Should be able to move this to the model's "validate" method
function validateVote(req, res, next) {
  const { params, body: { votes }} = req;

  const query = {
    where: { id: params.pollId },
    include: [PollOption]
  };

  // Make sure all pollOption IDs in votes are actually in poll
  Poll.findOne(query).then(poll => {
    if (!poll) {
      return res.status(400).send('Could not find poll with id ' + params.pollId);
    }

    // Fetch poll's options to verify ids against what user is submitting
    const pollOptionIds = poll.pollOptions.map(pollOption => pollOption.id);
    const submittedOptionIds = votes.map(vote => vote.pollOptionId);

    // Check if submitted ids belong to poll and if right length for corresponding poll type
    const optionIdsValid = submittedOptionIds.every(id => pollOptionIds.includes(id));
    const optionIdsDuplicate = (new Set(submittedOptionIds)).size !== submittedOptionIds.length;

    if (!optionIdsValid || optionIdsDuplicate || submittedOptionIds.length < 1) {
      return res.status(400).send('Issue with submitted option IDs');
    }

    // Checks if multi-vote cast for non-multi vote poll type (e.g. approval)
    if (!poll.allowMultiVote && submittedOptionIds.length !== 1) {
      return res.status(400).send('Poll type does not allow multiple choices.');
    }

    // Checks if score poll vote have scores (field validation handled by model)
    if (poll.pollType === pollTypes.scored && !votes.every(vote => Number.isInteger(vote.score))) {
      return res.status(400).send('Poll type requires valid scores for each vote.');
    }

    next();
  }).catch(() => {
    res.status(500).send('Error finding poll.');
  });
}

module.exports = {
  castVote,
  validateVote
};
