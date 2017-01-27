const routes = require('express').Router();

const {
  pollController,
  voteController,
  authController
 } = require('../controllers');

// Polls
routes.post('/', pollController.create);
routes.get('/', authController.requireAuth, pollController.getPollsByUser);
routes.get('/:pollId', pollController.getPollById);

// Voting
routes.post('/:pollId/vote', voteController.validateVote, voteController.castVote);

// Results
routes.get('/:pollId/results', pollController.getPollResults);

module.exports = routes;