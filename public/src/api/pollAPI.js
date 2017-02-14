import axios from 'axios';

export function createPoll(poll) {
  return axios.post('/api/poll', poll)
    .then(res => res.data);
}

export function getPoll(pollId) {
  return axios.get(`/api/poll/${pollId}`)
    .then(res => res.data);
}
