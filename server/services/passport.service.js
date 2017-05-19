const passport = require('passport');
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models').user;

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, pw, done) => {
  // Verify this email and password
  User.findOne({ where: { email: email.toLowerCase() }}).then(user => {
    if (!user) {
      return done(null, false);
    }

    // Check if password entered matches hashed and salted password
    user.comparePasswords(pw, (err, isMatch) => {
      if (err) {
        done(err);
      } else if (!isMatch) {
        // Timeout to prevent brute forcing
        setTimeout(() => done(null, false), 1000);
      } else {
        done(null, user);
      }
    });
  }).catch(err => {
    done(err);
  });
});

const callbackUrlRoot = process.env.NODE_ENV === 'production' ?
  'https://www.polltogether.org' :
  'http://localhost:' + process.env.PORT;

// Setup Facebook strategy
const fbOptions = {
	clientID: '430337357326530',
	clientSecret: process.env.FB_SECRET_ID,
	callbackURL: `${callbackUrlRoot}/api/auth/facebook/callback`,
  display: 'popup',
	profileFields: ['id', 'email', 'name'],
	scope: ['email']
};

const fbLogin = new FacebookStrategy(fbOptions, (accessToken, refreshToken, profile, done) => {
	User.findOne({ where: { fbID: profile.id }}).then(user => {
		if (user) {
			// Was previously authenticated
			done(null, user);
		} else {
      const { emails, id } = profile;

			// If no user, create one -- but must grant email access
			if (!emails || !emails[0]) {
				return done(null, null, { error: 'Email access is required' });
			}

			User.create({
				fbID: id,
				fbToken: accessToken,
				email: emails[0].value,
				authMethod: 'fb'
			}).then(createdUser => {
				done(null, createdUser);
			}).catch(err => {
				done(err);
			});
		}
	}).catch(err => {
		done(err);
	});
});

// Passport serializer/deserializer
passport.serializeUser((user, done) => {
  done(null, user.get('id'));
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, { id: user.get('id') });
  });
});

passport.use(localLogin);
passport.use(fbLogin);
