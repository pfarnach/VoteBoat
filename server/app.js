const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const compression = require('compression');
const enforcesSSL = require('express-enforces-ssl');

if (process.env.NODE_ENV !== 'production') {
  require('./config/env');
}

const routes = require('./routes');
const redisSession = require('./config/session');

const app = express();
const publicPath = path.join(__dirname, '../public/dist');

/*
MIDDLEWARE
*/
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.enable('trust proxy');
  app.use(enforcesSSL());
}

app.use(compression());
app.disable('x-powered-by');  // removes x-powered-by header
app.use(helmet());
app.use(express.static(publicPath));
app.use(bodyParser.json({ type: '*/*' }));
app.use(redisSession);

// Init passport session
app.use(passport.initialize());
app.use(passport.session());

/*
ROUTES
*/
app.use('/api', routes);
app.get('*', (req, res) => res.sendFile('index.html', { root: publicPath }));

module.exports = app;
