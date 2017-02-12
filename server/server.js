const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const compression = require('compression');

if (process.env.NODE_ENV !== 'production') {
  require('./config/env');
}
const models = require('./models');
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

app.use('/public', express.static(publicPath));
app.use(helmet());
app.use(compression());
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

/*
INIT DB + RUN SERVER
*/
models.sequelize.sync({ force: false }).then(() => {
  app.listen(process.env.PORT, () => console.log(`Server listening on port ${process.env.PORT}`));  // eslint-disable-line no-console
});

module.exports = app;
