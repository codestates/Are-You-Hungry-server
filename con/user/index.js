const express = require("express");
const router = express.Router();
const recipe = require("./recipe/index");
router.use("/recipe", recipe);

router.get("/", (req, res) => {
  res.status(200).send("get userinfo");
});

router.patch("/", (req, res) => {
  res.status(200).send("update userinfo");
});

router.delete("/", (req, res) => {
  res.status(200).send("delete userinfo");
});

router.patch("/password", (req, res) => {
  res.status(200).send("password");
});

module.exports = router;
