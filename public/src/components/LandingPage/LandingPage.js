import React from 'react';

import LandingHero from '../LandingHero/LandingHero';
import PollForm from '../../containers/PollForm/PollForm';
import styles from './LandingPage.sass';

const LandingPage = () => {
  return (
    <div className={styles.testClass}>
      <LandingHero />
      <PollForm />
    </div>
  );
};

export default LandingPage;
