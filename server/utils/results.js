const { pollTypes } = require('../keywords');

function countResults(poll) {
  switch (poll.pollType) {
    // Same counting method for FPTP and Approval
    case pollTypes.fptp:
    case pollTypes.approval: {
      const voteCount = poll.pollOptions.reduce((acc, option) => {
        acc.count[option.id] = { title: option.title };
        acc.count[option.id].total = option.votes.length;
        acc.totalVotesCast += option.votes.length;

        return acc;
      }, { count: {}, totalVotesCast: 0 });

      return voteCount;
    }

    // Score voting count
    case pollTypes.scored: {
      const voteCount = poll.pollOptions.reduce((acc, option) => {
        acc.count[option.id] = { title: option.title };
        acc.count[option.id].total = 0;
        acc.totalVotesCast += option.votes.length;

        // Adds up one poll option's score
        option.votes.forEach(vote => acc.count[option.id].total += vote.score);

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
