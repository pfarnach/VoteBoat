const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

const config = require('./config');
const models = require('./models');
const routes = require('./routes');

// Init
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();

// Session
const sessionStore = new RedisStore({ client: redis.createClient() });
const redisSession = session({
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, /* env === 'production',  // for HTTPS */
    maxAge: 604800
  },
  secret: config.store.SECRET_KEY
});

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(express.static(publicPath));
app.use(redisSession);

// Init passport session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', routes);
app.get('*', (req, res) => res.sendFile('index.html', { root: publicPath }));

// Init db + run server
models.sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => console.log(`Server listening on port ${port}`));  // eslint-disable-line no-console
});

module.exports = app;