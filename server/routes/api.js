const router = require("express").Router();
const controller = require("../controllers");
const { findResourceAndResourceFunction } = require("../middleware");

router.get("/:resource", findResourceAndResourceFunction, async (req, res) => {
  try {
    res.json(
      await controller[res.locals.resource][res.locals.resourceFunction]()
    );
  } catch (err) {
    res.json(err);
  }
});

router.get(
  "/:resource/:id",
  findResourceAndResourceFunction,
  async (req, res) => {
    try {
      res.json(
        await controller[res.locals.resource][res.locals.resourceFunction](
          req.params.id
        )
      );
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
);

router.post("/:resource", findResourceAndResourceFunction, async (req, res) => {
  try {
    res.json(
      await controller[res.locals.resource][res.locals.resourceFunction](
        req.body
      )
    );
  } catch (err) {
    res.json(err);
  }
});

//router.patch
module.exports = router;
