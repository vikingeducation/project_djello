router = require("express").Router();
const { validateUser } = require("../controllers/users");

router.post("/login", async (req, res) => {
  try {
    const userData = await validateUser(req.body.email, req.body.password);
    res.json(userData);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
