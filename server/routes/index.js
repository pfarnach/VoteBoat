const routes = require('express').Router();

const authRoutes = require('./auth.route');
const pollRoutes = require('./poll.route');

routes.use('/auth', authRoutes);
routes.use('/poll', pollRoutes);

module.exports = routes;