const { get } = require('lodash');
const { pollTypes } = require('../keywords');

const {
  poll: Poll,
  pollChoice: PollChoice,
  vote: Vote
} = require('../models');

function castVote(req, res) {
  const { user, body: { votes }} = req;

  const votesToMake = votes.map(vote => {
    return {
      score: vote.score,
      pollChoiceId: vote.pollChoiceId,
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
    include: [PollChoice]
  };

  // Make sure all pollChoice IDs in votes are actually in poll
  Poll.findOne(query).then(poll => {
    if (!poll) {
      return res.status(400).send('Could not find poll with id ' + params.pollId);
    }

    // Fetch poll's choices to verify ids against what user is submitting
    const pollChoiceIds = poll.pollChoices.map(pollChoice => pollChoice.id);
    const submittedChoiceIds = votes.map(vote => vote.pollChoiceId);

    // Check if submitted ids belong to poll and if right length for corresponding poll type
    const choiceIdsValid = submittedChoiceIds.every(id => pollChoiceIds.includes(id));
    const choiceIdsDuplicate = (new Set(submittedChoiceIds)).size !== submittedChoiceIds.length;

    if (!choiceIdsValid || choiceIdsDuplicate || submittedChoiceIds.length < 1) {
      return res.status(400).send('Issue with submitted choice IDs');
    }

    // Checks if multi-vote cast for non-multi vote poll type (e.g. approval)
    if (!poll.allowMultiVote && submittedChoiceIds.length !== 1) {
      return res.status(400).send('Poll type does not allow multiple choices.');
    }

    // Checks if score poll vote have scores (field validation handled by model)
    if (poll.pollType === pollTypes.scored && !votes.every(vote => Number.isInteger(vote.score))) {
      return res.status(400).send('Poll type requires valid scores for each vote.');
    }

    return next();
  }).catch(() => {
    res.status(500).send('Error finding poll.');
  });
}

module.exports = {
  castVote,
  validateVote
};
