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
    saveUninitialized: true
  },
  serverCallback: ({ port, host }) => () => {
    console.log(`Listening: http://${host}:${port}`);
  }
};
