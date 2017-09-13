module.exports = {
  startMongo: mongoose => (req, res, next) => {
    if (mongoose.connection.readyState) {
      next();
    } else {
      require("../mongo")().then(() => {
        next();
      });
    }
  },
  loggedInOnly: (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect("/login");
    }
  },
  loggedOutOnly: (req, res, next) => {
    if (!req.user) {
      next();
    } else {
      res.redirect("/login");
    }
  }
};
