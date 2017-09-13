const express = require("express");
const app = express();
const session = require("express-session");

// Session

app.use(
	session({
		secret: "ia ia cthulhu fhtagn",
		resave: false,
		saveUninitialized: false
	})
);

// Passport authentication

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require("passport-local").Strategy;

passport.use(
	new LocalStrategy(function(email, password, done) {
		User.find({
			where: {
				email: email
			}
		}).then(user => {
			console.log(user);
			if (!user || !user.validatePassword(password)) {
				return done(null, false);
			}
			return done(null, user);
		});
	})
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id).then(user => {
		done(null, user);
	});
});

app.post("/login", async (req, res) => {
	const authentication = await passport.authenticate("local", {
		failureFlash: true
	});

	console.log(authentication());
});

app.listen(3001, () => {
	console.log("Now listening...");
});
