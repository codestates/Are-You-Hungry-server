const express = require("express");
const router = express.Router();
const Models = require("../../models");
const { Op } = require("sequelize");
router.get("/*", (req, res) => {
  let [type, value] = req.url.split("?")[1].split("=");
  value = decodeURI(value);
  if (type === "username") {
    Models.User.findAll({
      include: [
        {
          model: Models.Food_info,
        },
      ],
      where: { username: { [Op.like]: "%" + value + "%" } },
    })
      .then((rst) => {
        console.log(rst);
        res.status(200).send("ok");
      })
      .catch((err) => {
        res.status(200).send("fail");
      });
  } else if (type === "item") {
    // Models.Igr.findAll({
    //   include: [
    //     {
    //       model: Models.Food_info,
    //       as:f ,
    //     },
    //   ],
    //   where: { name: { [Op.like]: "%" + value + "%" } },
    // })
    //   .then((rst) => {
    //     console.log(rst);
    //     res.status(200).send("ok");
    //   })
    //   .catch((err) => {
    //     res.status(200).send("fail");
    //   });
    Models.Food_info.findAll({
      include: [
        {
          model: Models.Ingredient,
          // attributes: ["igr_id", "food_id"],
          include: [
            {
              model: Models.Igr,
              // attributes: ["id", "name"],
            },
          ],
          where: {
            [Op.and]: [
              { "$Igr.name$": { [Op.like]: "%" + value + "%" } },
              { "$Igr.id$": "$Ingredient.igr_id$" },
            ],
          },
        },
      ],
      // where: {
      //   "$Ingredient.food_id$": "$Food_info.id$",
      // },
      group: ["$Food_info.id$"],
    });
  } else if (type === "foodname") {
    Models.Food_info.findAll({
      where: { food_name: { [Op.like]: "%" + value + "%" } },
    })
      .then((rst) => {
        let result = rst.map((x) => {
          return ({ food_name, cooking_time, level, food_img } = x.dataValues);
        });
        res.status(200).json({ data: { recipes: result }, message: "ok" });
      })
      .catch((err) => {
        res.status(200).send("fail");
      });
  } else {
    res.status(400).end("fail");
  }

  //  res.status(200).end("search");
});

module.exports = router;
