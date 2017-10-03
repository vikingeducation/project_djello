const secret = process.env.SESSION_SECRET;

/*SIGN THE SESSION*/
const createSignedSessionId = username => {
  return `${username}:${generateSignature(username)}`;
};
const generateSignature = username => md5(username + secret);

const loginMiddleware = (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  if (!sessionId) return next();

  const [email, signature] = sessionId.split(":");

  User.findOne({ email }, (err, user) => {
    if (signature === generateSignature(email)) {
      req.user = user;
      res.locals.currentUser = user;
      next();
    } else {
      res.send("You've tampered with your session!");
    }
  });
};

module.exports = {
  createSignedSessionId,
  loginMiddleware
};
