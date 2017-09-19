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
  logConnections: (req, res, next) => {
    console.log("incoming connection...");
    next();
  }
};
