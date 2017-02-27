import React, { PropTypes } from 'react';

const PollResults = ({ results }) => {
  // TODO: Calculate winner and display indication to user
  return (
    <div>
      <div>Total votes cast: { results.totalVotesCast }</div>
      <div>
        {results.count.map(result => <div key={result.id}>{result.title}: {result.total}</div>)}
      </div>
    </div>
  );
};

PollResults.propTypes = {
  results: PropTypes.shape({
    count: PropTypes.arrayOf(PropTypes.object),
    totalVotesCast: PropTypes.number,
  }),
};

export default PollResults;
