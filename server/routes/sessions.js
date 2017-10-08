const router = require("express").Router();
const { User } = require("../models");
const { getFullUserData } = require("../controllers");

//ATTEMPT TO LOGIN VIA A PREVIOUS SESSION
router.post("/login", async (req, res) => {
  console.log("validating previous session");
  try {
    let { accessToken, username } = req.body;
    console.log("req.body = ", req.body);
    const user = await getFullUserData({ username });
    if (!user) return res.sendStatus(404);
    let validToken = user.validateAccessToken(accessToken);
    console.log("user = ", user, ", validToken = ", validToken);
    if (!validToken) {
      console.log("invalid password");
      return res.sendStatus(400);
    } else if (validToken) {
      console.log("valid password");
      console.log("user = ", user);
      console.log("server sees user as = ", user);
      //if accessToken is fresh send it
      //else get a new one
      const data = {
        username: user.username,
        accessToken: user.getFreshAccessToken()
      };
      return res.json(data);
    }
    //if something went horribly wrong somehow
    return res.sendStatus(500);
  } catch (e) {
    //handle error
    console.error(e);
    return res.sendStatus(500);
  }
});

//CREATE A NEW SESSION (LOGIN A USER)
router.post("/", async (req, res) => {
  console.log("attempting login");
  try {
    //TODO: //attempt authentication
    let { username, password } = req.body;
    const user = await getFullUserData({ username: username });
    if (!user) {
      return res.sendStatus(404);
    }
    let validPassword = user.validatePassword(password);
    console.log("user = ", user, ", validPassword = ", validPassword);
    if (!validPassword) {
      console.log("invalid password");
      return res.sendStatus(400);
    } else if (validPassword) {
      console.log("valid password");
      console.log("user = ", user);
      console.log("server sees user as = ", user);
      const data = {
        username: user.username,
        accessToken: user.getFreshAccessToken()
      };
      return res.json(data);
    }
    //if something went horribly wrong somehow
    return res.sendStatus(500);
  } catch (e) {
    //handle error
    console.error(e);
    return res.sendStatus(500);
  }
});

//*****      NOT IMPLEMENTED      *****//
router.get("*", async (req, res) => {
  res.sendStatus(501);
});
router.put("*", async (req, res) => {
  res.sendStatus(501);
});
router.patch("*", async (req, res) => {
  res.sendStatus(501);
});
router.delete("*", async (req, res) => {
  res.sendStatus(501);
});
//*****      NOT IMPLEMENTED      *****//

module.exports = router;
