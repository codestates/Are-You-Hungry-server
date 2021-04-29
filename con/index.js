const express = require("express");
const router = express.Router();
const user = require("./user/index");
const search = require("./search/index");

router.use("/user", user);
router.use("/user", search);

router.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

module.exports = router;
