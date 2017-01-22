const config = require('../config');
const User = require('../models').user;

function signup(req, res, next) {
	const { email: rawEmail, password } = req.body;
	const email = rawEmail.toLowerCase();

	// Enforce email and password params
	if (!email || !password) {
		res.status(422).send({ error: 'You must provide a valid email and password' });
	}

	// See if user with given email exists
	User.findOne({ where: { email }}).then(user => {
		// If a user with email already exists, return error
		if (user) {
			return res.status(422).send({ error: 'Email is already in use' });
		}

		// If a user with an email does NOT exist, create and save user record
		User.create({
			email,
			password
		}).then(newUser => {
			// Respond to request indicating the user was created
			req.login(newUser, err => {
        if (err) {
          return res.status(400).send({ error: 'Serialization error' });
        }

        res.send({ loggedIn: true });
      })
		}).catch(err => {
			res.status(400).send({ error: 'Invalid email or password' });
		})
	});
}

function signin(req, res) {
  res.send({ loggedIn: true });
}

function signout(req, res) {
  req.session.destroy(() => {
    res.send({ msg: 'Successfully signed out'});
  });
}

module.exports = {
  signup,
  signin,
  signout
};