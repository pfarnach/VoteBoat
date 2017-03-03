import axios from 'axios';

function signUp(email, password) {
  return axios.post('/api/auth/signup', { email, password })
    .then(res => res.data);
}

function signIn(email, password) {
  return axios.post('/api/auth/signin', { email, password })
    .then(res => res.data);
}

function signOut() {
  return axios.get('/api/auth/signout')
    .then(res => res.data);
}

function checkStatus() {
  return axios.get('/api/auth/status')
    .then(res => res.data);
}

export default {
  signUp,
  signIn,
  signOut,
  checkStatus,
};
