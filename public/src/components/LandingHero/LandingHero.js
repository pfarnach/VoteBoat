import React from 'react';
import { Button } from 'semantic-ui-react';

import styles from './LandingHero.sass';

const LandingHero = () => {
  return (
    <div className={styles.container}>
      <div>Make polls, make choices, make dreams come true</div>
      <Button primary>Make a poll</Button>
    </div>
  );
};

export default LandingHero;
