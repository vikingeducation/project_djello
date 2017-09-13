router = require("express").Router();
const { getUser, getUsers, addUser } = require("../controllers/users");

router.get("/", async (req, res) => {
  try {
    return res.json(await getUsers());
  } catch (err) {
    return res.json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    return res.json(await getUser(req.params.id));
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    return res.json(await addUser(req.body));
  } catch (err) {
    return res.json(err);
  }
});

//router.patch
module.exports = router;
