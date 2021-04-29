require("dotenv").config();
const express = require("express");
const router = express.Router();
const user = require("./user/index");
const search = require("./search/index");
const { sign, verify } = require("jsonwebtoken");
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

router.use("/user", user);
router.use("/search", search);

router.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

router.post("/signin", (req, res) => {
  res.status(201).end("signin");
});

router.post("/signup", (req, res) => {
  res.status(201).end("signup");
});

router.get("/signout", (req, res) => {
  res.status(200).end("signout");
});

module.exports = router;
