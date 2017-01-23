const routes = require('express').Router();
const passport = require('passport');

require('../services/passport.service');
const authController = require('../controllers/auth.controller');

const requireSignin = passport.authenticate('local');

// Local auth
routes.post('/signup', authController.signup);
routes.post('/signin', requireSignin, authController.signin);
routes.get('/signout', authController.requireAuth, authController.signout);

module.exports = routes;