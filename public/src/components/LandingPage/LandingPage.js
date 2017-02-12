import React from 'react';
import axios from 'axios';

import styles from './LandingPage.sass';

const LandingPage = () => {
  axios.get('/api/poll/1')
    .then(res => console.log(res));

  return (
    <div className={styles.testClass}>
      I am the landing page!!!
    </div>
  );
};

export default LandingPage;
