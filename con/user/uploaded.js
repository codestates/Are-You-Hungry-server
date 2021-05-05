require("dotenv").config();
const express = require("express");
const router = express.Router();
const Models = require("../../models");
const { Op } = require("sequelize");
router.get("/:username", (req, res) => {
  let { id, username } = res.locals;
  let value = req.url.slice(1);
  value = decodeURI(value);
  Models.User.findAll({
    include: [
      {
        model: Models.Food_info,
      },
    ],
    where: { username: value },
  })
    .then((rst) => {
      let result = rst[0].dataValues.Food_infos.map((x) => {
        let { food_id, food_name, food_img } = x.dataValues;
        return { food_id, food_name, food_img };
      });
      res.status(200).json({ data: result, message: "0k" });
    })
    .catch((err) => {
      res.status(400).send("fail");
    });
});

module.exports = router;
