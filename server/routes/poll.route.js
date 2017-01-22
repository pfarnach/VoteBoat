const routes = require('express').Router();

const { requireAuth } = require('./route.utils');
const pollController = require('../controllers/poll.controller');

routes.post('/', pollController.create);
routes.get('/', requireAuth, pollController.getPollsByUser);

module.exports = routes;