import React, { PropTypes } from 'react';

const PollDashboard = ({ match }) => {
  return (
    <div>
      Poll #{match.params.pollId}
    </div>
  );
};

PollDashboard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default PollDashboard;
