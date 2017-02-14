const { pollTypes } = require('../keywords');

function countResults(poll) {
  switch (poll.pollType) {
    // Same counting method for FPTP and Approval
    case pollTypes.fptp:
    case pollTypes.approval: {
      const voteCount = poll.pollChoices.reduce((acc, choice) => {
        acc.count[choice.id] = { title: choice.title };
        acc.count[choice.id].total = choice.votes.length;
        acc.totalVotesCast += choice.votes.length;

        return acc;
      }, { count: {}, totalVotesCast: 0 });

      return voteCount;
    }

    // Score voting count
    case pollTypes.scored: {
      const voteCount = poll.pollChoices.reduce((acc, choice) => {
        acc.count[choice.id] = { title: choice.title };
        acc.count[choice.id].total = 0;
        acc.totalVotesCast += choice.votes.length;

        // Adds up one poll choice's score
        choice.votes.forEach(vote => acc.count[choice.id].total += vote.score);

        return acc;
      }, { count: {}, totalVotesCast: 0 });

      return voteCount;
    }

    default:
      throw new Error('Unknown poll type');
  }
}

module.exports = {
  countResults
};
