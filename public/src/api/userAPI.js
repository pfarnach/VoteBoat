import axios from 'axios';

function userInfo() {
  return axios.get('/api/user')
    .then(res => res.data);
}

export default {
  userInfo,
};
