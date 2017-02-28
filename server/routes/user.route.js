const routes = require('express').Router();

const { userController, authController } = require('../controllers');

// User
routes.get('/', authController.requireAuth, userController.userInfo);

module.exports = routes;
