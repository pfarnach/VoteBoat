const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

// Session
const redisOptions = { url: process.env.REDIS_URL };
const sessionStore = new RedisStore({ client: redis.createClient(redisOptions) });
const redisSession = session({
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // for HTTPS */
    maxAge: 604800
  },
  secret: process.env.VOTEBOAT_SECRET
});

module.exports = redisSession;