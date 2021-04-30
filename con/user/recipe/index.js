const express = require("express");
const router = express.Router();

router.post("/recipe", (req, res) => {
  res.status(200).send("add recipe");
});

router.patch("/recipe", (req, res) => {
  res.status(200).send("update recipe");
});

module.exports = router;
