import React, { Component } from 'react';
import axios from 'axios';

import styles from './Test.sass';

class Test extends Component {
  componentDidMount() {
    axios.get('/api/poll/1')
      .then(res => {
        console.log(res.data);
      });
  }

  render() {
    return <div className={ `${styles.testTwo} test-global` }>Test component loaded</div>;
  }
}

export default Test;
