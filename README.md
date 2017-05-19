# Vote Boat

### Overview
This is a project that will allow users to create, share and vote on different polls (FPTP, Scored, Approval) in the style of Doodle.

It uses session-based authentication with Node/Express, Redis and Postgres. The frontend is built with React/Redux.

### Setup
Clone the repo and install the dependencies with either `yarn` or `npm install`.

Make sure Redis and Postgres are running.

You'll need to set some environment variables.  To do this, create an `env.js` file in the `/server/config` directory. See `env.sample.js` for an example.

### Run project
Start up the express server on `localhost:4000` with `yarn run dev:server`.

And for easier client-side development, you can also run webpack dev server on `localhost:8080` with `yarn run dev:client`.

### Tests
Run server tests: `yarn run test:server`
Run client tests: `yarn run test:client`

### Linting
Run `yarn run lint:watch`
