const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const { User, Board, List, Card } = require("./models");

const morgan = require("morgan");
const morganToolkit = require("morgan-toolkit")(morgan);

app.use(morganToolkit());

// Session

app.use(
	session({
		secret: "ia ia cthulhu fhtagn",
		resave: false,
		saveUninitialized: false
	})
);

// Body parser

app.use(bodyParser.json());

// Passport authentication

const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

const LocalStrategy = require("passport-local").Strategy;

passport.use(
	new LocalStrategy({ usernameField: "email" }, function(
		email,
		password,
		done
	) {
		User.find({
			where: {
				email: email
			}
		}).then(user => {
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

app.post("/login", passport.authenticate("local"), async (req, res) => {
	const boards = await Board.findAll({
		where: { userId: req.user.id },
		include: [{ model: List, include: [{ model: Card }] }],
		order: [
			["updatedAt", "DESC"],
			["title"],
			[List, "boardIndex"],
			[List, Card, "listIndex"]
		]
	});

	res.json({
		user: {
			id: req.user.id,
			username: req.user.username,
			email: req.user.email
		},
		boards: boards
	});
});

app.post("/api/boards/new", async (req, res) => {
	const newBoard = await Board.create({
		title: "untitled board",
		userId: req.body.userId
	});
	res.json(newBoard);
});

app.delete("/api/boards", async (req, res) => {
	await Board.destroy({ where: { id: req.body.id } });
	res.end();
});

app.post("/api/lists/new", async (req, res) => {
	const newList = await List.create({
		title: "untitled list",
		description: "Your description here",
		boardId: req.body.boardId,
		boardIndex: req.body.boardIndex
	});

	res.json(newList);
});

app.delete("/api/lists", async (req, res) => {
	await List.destroy({ where: { id: req.body.id } });
	res.end();
});

app.listen(3001, () => {
	console.log("Now listening...");
});
