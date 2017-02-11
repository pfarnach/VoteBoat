# Vote Boat

### Overview
This is a project that will allow users to create, share and vote on different polls (FPTP, Scored, Approval) in the style of Doodle.

It uses session-based authentication with Node/Express, Redis and Postgres. The frontend is built with React/Redux.

### Use
Clone the repo and install the dependencies with either `yarn` or `npm install`.

You'll need to set some environment variables.  To do this, create an `env.js` file in the `/server/config` directory that looks like:
```
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.DATABASE_URL = 'your postgres db url';
  process.env.REDIS_URL = 'redis://localhost:6379/1';
  process.env.PORT = 3000;
} else if (env === 'test') {
  process.env.DATABASE_URL = 'your postgres test db url';
  process.env.REDIS_URL = 'redis://localhost:6379/1';
  process.env.PORT = 3000;
}

process.env.VOTEBOAT_SECRET = 'your secret here';
```

Make sure Redis and Postgres are running.

Start up the server on `localhost:3000` with `yarn run start` or `npm run start`.

### Tests
Run server tests: `yarn run test:server`
Run client tests: `yarn run test:client`

### Linting
Run `yarn run lint:watch`
