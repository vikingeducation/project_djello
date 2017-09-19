const { User } = require("../models");

module.exports = {
  port: process.env.PORT || process.argv[2] || 3001,
  host: "localhost",
  handlebars: {
    partialsDir: "views/partials",
    defaultLayout: "application"
  },
  session: {
    secret: "candlelight",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, httpOnly: false },
    proxy: true
  },
  morgan: "tiny",
  bodyParser: { extended: true },
  serverCallback: ({ port, host }) => () => {
    console.log(`Listening: http://${host}:${port}`);
  },
  passportSerializeUser: (user, done) => {
    console.log("serializing");
    done(null, user.id);
  },
  passportDeserializeUser: (id, done) => {
    console.log("DEserializing");
    User.findById(id).then(user => {
      done(null, user);
    });
  }
};
