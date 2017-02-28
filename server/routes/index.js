const routes = require('express').Router();

const authRoutes = require('./auth.route');
const pollRoutes = require('./poll.route');
const userRoutes = require('./user.route');

routes.use('/auth', authRoutes);
routes.use('/poll', pollRoutes);
routes.use('/user', userRoutes);

module.exports = routes;
