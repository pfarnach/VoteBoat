# Vote Boat

### Overview
This is a project that will allow users to create, share and vote on different polls (Ranked Choice, Approval, FPTP) in the style of Doodle.

It uses session-based authentication with Node/Express, Redis and Postgres. The front-end will use React, and Redux if need be.

### Use
Clone the repo and install the dependencies with either `yarn` or `npm install`.

Create a `config.js` file in the server directory that looks like:
```
module.exports = {
	db: {
		POSTGRES_URI: 'postgres://user:password@localhost:5432/db_name',
		REDIS_URI: 'http://localhost:6379' (or wherever you have your Redis server running)
	},
	store: {
		SECRET_KEY: 'your secret key here'
	}
}
```

Make sure Redis and Postgres are running.

Start up the server on `localhost:3000` with `yarn run start` or `npm run start`.

### Tests
Run `yarn run test`

### Linting
Run `yarn run lint:watch`
