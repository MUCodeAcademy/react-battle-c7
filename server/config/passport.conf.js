const LocalStrategy = require("passport-local");
const { Strategy } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const { login, getByUserID } = require("../models/user.models");

function configPassport(passport) {
	//! Local strategy
	passport.use(
		"local-login",
		new LocalStrategy(async (username, password, done) => {
			//! Check the login things like before
			const { data, error } = await login(username, password);
			//! If everything looks good send back a signed jwt with the user's uuid
			if (error) {
				return done(error);
			}
			//! Otherwise send an appropriate message

			const token = jwt.sign({ uuid: data.uuid }, process.env.SECRET_KEY, {
				expiresIn: "7 days",
			});

			return done(null, { username: data.username }, { token });
		})
	);

	//! JWT Extraction Strategy
	const cookieJWTExtractor = (req) => {
		let token = null;
		if (req && req.cookies) {
			token = req.cookies["jwt"];
		}
		return token;
	};

	//! JWT strategy

	const jwtOptions = {
		secretOrKey: process.env.SECRET_KEY,
		jwtFromRequest: cookieJWTExtractor,
	};

	passport.use(
		"jwt",
		new Strategy(jwtOptions, async (payload, done) => {
			//? Grab a user by user.uuid
			if (!payload || !payload.uuid) {
				return done(true, false, "Invalid Credentials");
			}
			const { data, error } = await getByUserID(payload.uuid);
			if (error) {
				return done(true, false, "Invalid Credentials");
			}
			return done(false, data, null);
		})
	);

	//! Serialize user
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
}

module.exports = configPassport;
