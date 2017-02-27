import React from 'react';

import { LandingHero } from '../../components';
import { PollForm } from '../../containers';
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
