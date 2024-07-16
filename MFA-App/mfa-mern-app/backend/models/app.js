const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
	  usernameField: 'email',
	  passwordField: 'password'
}, (email, password, done) => {
	  User.findOne({ email })
	    .then(user => {
		          if (!user) {
				          return done(null, false, { message: 'Invalid email or password' });
				        }
		          if (!user.comparePassword(password)) {
				          return done(null, false, { message: 'Invalid email or password' });
				        }
		          return done(null, user);
		        })
	    .catch(err => done(err));
}));
