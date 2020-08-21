const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		}
	);
});

passport.use(
	new GoogleStrategy(
	{ 
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback',
		proxy: true
	}, 
	async (accessToken, refreshToken, profile, done) => {
		const existingUser = await User.findOne({ googleId: profile.id });
		if (existingUser) {
			return done(null, existingUser);
		}
		
		const user = await new User({ googleId: profile.id }).save();
		done(null, user);			
	}
	)
);

// twitter strategy

passport.use(
	new TwitterStrategy(
	{ 
		consumerKey: keys.twitterClientID,
		consumerSecret: keys.twitterClientSecret,
		callbackURL: 'http://192.168.1.5:5000/auth/twitter/callback'
	}, 
	async (accessToken, refreshToken, profile, done) => {
		const existingUser = await User.findOne({ twitterId: profile.id });
		if (existingUser) {
			return done(null, existingUser);
		}
		
		const user = await new User({ twitterId: profile.id }).save();
		done(null, user);			
	}
	)
);