import axios from 'axios';

export function userInfo() {  // eslint-disable-line import/prefer-default-export
  return axios.get('/api/user')
    .then(res => res.data);
}
