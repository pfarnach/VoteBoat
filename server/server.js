const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');

if (process.env.NODE_ENV !== 'production') {
  require('./config/env');
}
const models = require('./models');
const routes = require('./routes');
const redisSession = require('./config/session');

const publicPath = path.join(__dirname, '../public');
const app = express();

// Middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(helmet());
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
  app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));  // eslint-disable-line no-console
});

module.exports = app;