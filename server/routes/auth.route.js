const routes = require('express').Router();
const passport = require('passport');

require('../services/passport.service');
const { authController } = require('../controllers');

const requireSignin = passport.authenticate('local');

const fbBaseAuthOptions = {
  session: true,
  successRedirect: '/auth-response',
  failureRedirect: '/auth-response?error=email',
  display: 'popup',
  scope:['email']
};

const requireFbSignin = passport.authenticate('facebook', fbBaseAuthOptions);
const requireFbSigninFail = passport.authenticate(
  'facebook',
  Object.assign({}, fbBaseAuthOptions, { authType: 'rerequest'})
);

// Local auth
routes.post('/signup', authController.signup);
routes.post('/signin', requireSignin, authController.signin);
routes.get('/signout', authController.requireAuth, authController.signout);
routes.get('/status', authController.checkStatus);

// OAuth - Facebook
routes.get('/facebook', requireFbSignin);
routes.get('/facebook-rerequest', requireFbSigninFail)
routes.get('/facebook/callback', requireFbSignin);

module.exports = routes;