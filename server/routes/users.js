const router = require("express").Router();
const { generateToken, validateUser } = require("../controllers/users");

router.post("/login", async (req, res) => {
  try {
    const userData = await generateToken(req.body.email, req.body.password);
    res.cookie("token", userData.token);
    res.json(userData);
  } catch (error) {
    res.cookie("token", null);
    res.json({ error: { name: error.name, message: error.message } });
  }
});

router.post("/authenticate", async (req, res) => {
  try {
    if (!req.cookies.token) throw new Error("no token present");
    let userData = await validateUser(req.cookies.token);
    res.json({ _id: userData._id, email: userData.email, error: null });
  } catch (error) {
    res.cookie("token", null);
    res.json({ error: error.message });
  }
});

router.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null);
    res.json({ error: "user has logged out successfully" });
  } catch (error) {
    res.cookie("token", null);
    res.json({ error: error.message });
  }
});

module.exports = router;
