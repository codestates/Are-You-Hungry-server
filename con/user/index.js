require("dotenv").config();
const express = require("express");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const { route } = require("../search");
const ACCESS_SECRET = process.env.ACCESS_SECRET;

router.get("/likes*", (req, res) => {
  res.status(200).end("get likes");
  res.status(500).send("err");
});

router.get("/uploaded*", (req, res) => {
  res.status(200).end("get uploaded");
  res.status(500).send("err");
});

router.get("/", (req, res) => {
  res.status(200).end("get userinfo");
  res.status(500).send("err");
});

router.patch("/", (req, res) => {
  res.status(200).end("update userinfo");
  res.status(500).send("err");
});

router.delete("/", (req, res) => {
  res.status(200).end("delete userinfo");
  res.status(500).send("err");
});

router.patch("/password", (req, res) => {
  res.status(200).end("password");
  res.status(500).send("err");
});

router.post("/recipe", (req, res) => {
  res.status(200).end("add recipe");
  res.status(500).send("err");
});

router.patch("/recipe", (req, res) => {
  res.status(200).end("update recipe");
  res.status(500).send("err");
});

module.exports = router;
