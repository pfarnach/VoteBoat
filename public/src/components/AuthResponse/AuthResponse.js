import React, { Component } from 'react';
import URLSearchParams from 'url-search-params';

// This will be what the oAuth window redirects to on success
class AuthResponse extends Component {
  componentDidMount() {
    const queryString = window.location.search;

    let error = false;

    if (queryString) {
      const parsedSearchString = new URLSearchParams(queryString.substring(1));
      error = !!parsedSearchString.get('error');
    }

    window.opener.open(error ? '/signin?error=true' : '/dashboard', '_self');
    window.opener.focus();
    window.close();
  }

  render() {
    return (
      <div />
    );
  }
}

AuthResponse.propTypes = {};

export default AuthResponse;
