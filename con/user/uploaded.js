require("dotenv").config();
const express = require("express");
const router = express.Router();
const Models = require("../../models");
const { Op } = require("sequelize");
router.get("/:username", (req, res) => {
  let { id, username } = res.locals;
  let value = req.url.slice(1);
  value = decodeURI(value);
  Models.User.findOne({
    include: [
      {
        model: Models.Food_info,
        include: [
          {
            model: Models.User,
            as: "counted",
          },
        ],
      },
    ],
    where: { username: value },
  })
    .then((rst) => {
      // console.log(rst.dataValues.liked);
      let result = rst.dataValues.Food_infos.map((x) => {
        let { food_id, food_name, food_img, counted } = x.dataValues;

        return {
          food_id,
          food_name,
          food_img,
          isOn: counted.length > 0 ? true : false,
        };
      });
      res.status(200).json({ data: result, meassage: "ok" });
    })
    .catch((err) => {
      res.status(400).send("fail");
    });
});

module.exports = router;
