import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import URLSearchParams from 'url-search-params';

export const AuthFormPure = (props) => {
  const { isSignedIn, location: { search } } = props;

  let error = false;

  if (search) {
    const parsedSearchString = new URLSearchParams(search.substring(1));
    error = !!parsedSearchString.get('error');
  }

  if (isSignedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      { error &&
        <div id="error-msg">Email permission is required</div>
      }
      <Button
        onClick={() => window.open(
          `/api/auth/facebook${error ? '-rerequest' : ''}`,
          '_blank',
          'height=650,width=540',
        )}
      >
        Connect with Facebook
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
});

AuthFormPure.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(AuthFormPure);
