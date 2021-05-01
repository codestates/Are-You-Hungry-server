const express = require("express");
const router = express.Router();
const Models = require("../../models");
const { Op } = require("sequelize");
const { Model } = require("sequelize");
router.get("/*", (req, res) => {
  let [type, value] = req.url.split("?")[1].split("=");
  value = decodeURI(value);
  if (type === "username") {
    Models.Food_info.findAll({
      include: [
        {
          model: Models.User,
          where: { username: value },
        },
      ],
      order: [["food_id", "ASC"]],
    })
      .then((rst) => {
        let result = rst.map((x) => {
          let = { food_id, food_name, food_img } = x.dataValues;
          return { food_id, food_name, food_img };
        });
        res.status(200).json({ data: { recipes: result }, message: "ok" });
      })
      .catch((err) => {
        res.status(200).send("fail");
      });
  } else if (type === "item") {
    Models.Food_info.findAll({
      include: [
        {
          model: Models.Ingredient,
          where: { name: { [Op.like]: "%" + value + "%" } },
        },
      ],
      order: [["food_id", "ASC"]],
    })
      .then((rst) => {
        let result = rst.map((x) => {
          let = { food_id, food_name, food_img } = x.dataValues;
          return { food_id, food_name, food_img };
        });
        res.status(200).json({ data: { recipes: result }, message: "ok" });
      })
      .catch((err) => {
        res.status(200).send("fail");
      });
  } else if (type === "foodname") {
    Models.Food_info.findAll({
      where: { food_name: { [Op.like]: "%" + value + "%" } },
      order: [["food_id", "ASC"]],
    })
      .then((rst) => {
        let result = rst.map((x) => {
          let = { food_id, food_name, food_img } = x.dataValues;
          return { food_id, food_name, food_img };
        });
        res.status(200).json({ data: { recipes: result }, message: "ok" });
      })
      .catch((err) => {
        console.log(err);
        res.status(200).send("fail");
      });
  } else {
    res.status(400).end("fail");
  }

  //  res.status(200).end("search");
});

module.exports = router;
