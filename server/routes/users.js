const router = require("express").Router();
const localStorage = require("localStorage");
const { generateToken, validateUser } = require("../controllers/users");

router.post("/login", async (req, res) => {
  try {
    const userData = await generateToken(req.body.email, req.body.password);
    localStorage.setItem("token", userData.token);
    res.json(userData);
  } catch (error) {
    localStorage.setItem("token", null);
    res.json({ error: error.message });
  }
});

router.post("/authenticate", async (req, res) => {
  try {
    if (!localStorage.getItem("token")) throw new Error("no token present");
    let userData = await validateUser(localStorage.getItem("token"));
    res.json({ _id: userData._id, email: userData.email, error: null });
  } catch (error) {
    localStorage.getItem("token") = null;
    res.json({ error: error.message });
  }
});

module.exports = router;
