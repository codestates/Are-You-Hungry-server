const express = require("express");
const router = express.Router();
const user = require("./user/index");
const search = require("./search/index");

router.use("/user", user);
router.use("/search", search);

router.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

router.post("/signin", (req, res) => {
  res.status(201).send("signin");
});

router.post("/signup", (req, res) => {
  res.status(201).send("signup");
});

router.get("/signout", (req, res) => {
  res.status(200).send("signout");
});

module.exports = router;
