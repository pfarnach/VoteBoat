import React, { PropTypes } from 'react';

const App = ({ children }) => {
  return (
    <div>
      App header
      { children }
      App footer
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
