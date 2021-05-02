require("dotenv").config();
const express = require("express");
const router = express.Router();
const { verify } = require("jsonwebtoken");
const { route } = require("../search");
const Models = require("../../models");
const { Op } = require("sequelize");
const ACCESS_SECRET = process.env.ACCESS_SECRET;

router.get("/likes*", (req, res) => {
  try {
    let [type, value] = req.url.split("?")[1].split("=");
    value = decodeURI(value);
    if (type === "username") {
      Models.User.findAll({
        include: [
          {
            model: Models.Food_info,
            as: "liked",
          },
        ],
        where: { username: value },
      }).then((rst) => {
        let result = rst[0].dataValues.liked.map((x) => {
          let { food_id, food_name, food_image } = x.dataValues;
          return { food_id, food_name, food_image };
        });
        res.status(200).json({ data: result, message: "0k" });
      });
    } else if (type === "foodname") {
      res.send("end");
    } else {
      res.send("end");
    }
  } catch {
    res.send("end");
  }

  // res.status(200).end("get likes");
  // res.status(500).send("err");
});

router.post("/like", (req, res) => {
  try {
  } catch {
    res.send("end");
  }

  // res.status(200).end("get likes");
  // res.status(500).send("err");
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

router.get("/recipe", (req, res) => {
  res.status(200).end("get recipe");
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
