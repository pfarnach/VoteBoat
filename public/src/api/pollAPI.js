import axios from 'axios';

function createPoll(poll) {
  return axios.post('/api/poll', poll)
    .then(res => res.data);
}

function getPoll(pollId) {
  return axios.get(`/api/poll/${pollId}`)
    .then(res => res.data);
}

function getPollResults(pollId) {
  return axios.get(`/api/poll/${pollId}/results`)
    .then(res => res.data);
}

function castVote(pollId, pollChoices) {
  return axios.post(`/api/poll/${pollId}/vote`, pollChoices)
    .then(res => res.data);
}

export default {
  createPoll,
  getPoll,
  getPollResults,
  castVote,
};
