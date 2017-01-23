const routes = require('express').Router();

const { requireAuth } = require('../controllers/auth.controller');
const pollController = require('../controllers/poll.controller');
const voteController = require('../controllers/vote.controller');

// Polls
routes.post('/', pollController.create);
routes.get('/', requireAuth, pollController.getPollsByUser);
routes.get('/:pollId', pollController.getPollById);

// Voting
routes.post('/vote', voteController.validateVote, voteController.castVote);

module.exports = routes;