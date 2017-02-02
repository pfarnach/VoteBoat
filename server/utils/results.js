function countResults(poll) {
  const voteCount = poll.pollOptions.reduce((acc, option) => {
    acc[option.id] = option.votes.length;
    return acc;
  }, {});

  return voteCount;
}

module.exports = {
  countResults
};