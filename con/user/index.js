const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).end("get userinfo");
});

router.patch("/", (req, res) => {
  res.status(200).end("update userinfo");
});

router.patch("/password", (req, res) => {
  res.status(200).end("password");
});

router.post("/recipe", (req, res) => {
  res.status(200).end("add recipe");
});

router.patch("/recipe", (req, res) => {
  res.status(200).end("update recipe");
});

module.exports = router;
