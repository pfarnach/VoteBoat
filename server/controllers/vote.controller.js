const { poll: Poll, pollOption: PollOption, vote: Vote } = require('../models');

function castVote(req, res) {
  const { user, body: { votes }} = req;

  const votesToMake = votes.map(vote => {
    return {
      rank: vote.rank || null,
      pollOptionId: vote.pollOptionId,
      userId: user && user.id ? user.id : null
    };
  });

  Vote.bulkCreate(votesToMake).then(() => {
    res.status(201).send('Vote successfully cast.');
  }).catch(err => {
    console.error(err);
    res.status(400).send('Error casting vote.');
  });
}

function validateVote(req, res, next) {
  const { body: { pollId, votes }} = req;

  const query = {
    where: { id: pollId },
    include: [PollOption]
  };

  // Make sure all pollOption IDs in votes are actually in poll
  Poll.findOne(query).then(poll => {
    if (!poll) {
      return res.status(400).send('Could not find poll with id ' + pollId);
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

    if (!poll.allowMultiVote && submittedOptionIds.length !== 1) {
      return res.status(400).send('Poll type does not support multiple choices.');
    }

    next();
  }).catch(err => {
    console.error(err);
    res.status(400).send('Error finding poll.');
  });
}

module.exports = {
  castVote,
  validateVote
};