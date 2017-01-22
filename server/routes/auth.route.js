const routes = require('express').Router();
const passport = require('passport');

const { requireAuth } = require('./route.utils');
const passportService = require('../services/passport');
const authController = require('../controllers/auth.controller');

const requireSignin = passport.authenticate('local');

// Local auth
routes.post('/signup', authController.signup);
routes.post('/signin', requireSignin, authController.signin);
routes.get('/signout', requireAuth, authController.signout);

module.exports = routes;