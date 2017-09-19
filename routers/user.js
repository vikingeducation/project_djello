module.exports = passport => {
  const express = require("express");
  const userRouter = express.Router();

  userRouter.post("/session", (req, res, next) => {
    passport.authenticate("local", { session: true }, (err, user, info) => {
      if (!user) {
        return res.json({ error: "There was a problem logging you in." });
      }
      req.login(user, () => {
        const clientData = {
          user: {
            _id: user._id,
            email: user.email,
            boards: user.boards
          }
        };
        return res.json(clientData);
      });
    })(req, res, next);
  });

  userRouter.get("/logout", (req, res) => {
    // console.log("request to log out");
    // req.logout(err => {
    // if (err) throw err;
    res.status(200);
    res.send("success");
    // });
  });

  return userRouter;
};
