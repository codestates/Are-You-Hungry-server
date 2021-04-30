require("dotenv").config();
const express = require("express");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const { route } = require("../search");
const ACCESS_SECRET = process.env.ACCESS_SECRET;

router.get("/likes*", (req, res) => {
  res.status(200).end("get likes");
});

router.get("/uploaded*", (req, res) => {
  res.status(200).end("get uploaded");
});

router.get("/", (req, res) => {
  res.status(200).end("get userinfo");
});

router.patch("/", (req, res) => {
  res.status(200).end("update userinfo");
});

router.delete("/", (req, res) => {
  res.status(200).end("delete userinfo");
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
