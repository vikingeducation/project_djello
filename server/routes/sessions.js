const router = require("express").Router();
const { User } = require("../models");
const { getFullUserData } = require("../controllers");

//ATTEMPT TO LOGIN VIA A PREVIOUS SESSION
router.post("/login", async (req, res) => {
  console.log("validating previous session");
  try {
    let { accessToken, username } = req.body;
    const user = await getFullUserData({ username });
    if (!user) return res.sendStatus(404);
    let validToken = await user.validateAccessToken(accessToken);
    if (!validToken) {
      return res.sendStatus(400);
    } else if (validToken) {
      //if accessToken is fresh send it
      //else get a new one
      const data = {
        username: user.username,
        accessToken: await user.getFreshAccessToken()
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
router.post("/logout", async (req, res) => {
  try {
    let { accessToken, username } = req.body;
    const user = await getFullUserData({ username });
    let validToken = user.validateAccessToken(accessToken);
    if (!user) return res.sendStatus(404);
    if (!validToken) {
      return res.sendStatus(400);
    } else if (validToken) {
      //delete their session
      user.accessToken = null;
      await user.save();
      return res.sendStatus(200);
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
  // console.log("attempting login");
  try {
    //TODO: //attempt authentication
    let { username, password } = req.body;
    const user = await getFullUserData({ username: username });
    if (!user) {
      return res.sendStatus(404);
    }
    let validPassword = user.validatePassword(password);
    if (!validPassword) {
      return res.sendStatus(400);
    } else if (validPassword) {
      const data = {
        username: user.username,
        accessToken: await user.getFreshAccessToken()
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
