require("dotenv").config();
const express = require("express");
const router = express.Router();
const Models = require("../../../models");
const { Op } = require("sequelize");

router.get("/*", (req, res) => {
  let { id, username } = res.local;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
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
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

router.post("/", (req, res) => {
  let { id, username } = res.local;
  let food_id = req.body.food_id;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        Models.likes
          .create({
            food_id: food_id,
            user_id: user_id,
          })
          .then((rst) => {
            res.status(200).json({ meassge: "created" });
          })
          .catch((err) => {
            res.status(200).send("fail");
          });
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

module.exports = router;
