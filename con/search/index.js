const express = require("express");
const router = express.Router();
const Models = require("../../models");
const { Op } = require("sequelize");
router.get("/*", (req, res) => {
  const authorization = req.headers["authorization"].split(" ")[1];
  try {
    let { id, username } = verify(authorization, ACCESS_SECRET);
    Models.User.findOne({
      where: { id, username },
    })
      .then((rst) => {
        if (rst.dataValues) {
          let [type, value] = req.url.split("?")[1].split("=");
          value = decodeURI(value);
          if (type === "username") {
            Models.Food_info.findAll({
              include: [
                {
                  model: Models.User,
                  where: { username: value },
                },
                {
                  model: Models.User,
                  as: "counted",
                },
              ],
              order: [["food_id", "ASC"]],
            })
              .then((rst) => {
                let result = rst.map((x) => {
                  let = {
                    food_id,
                    food_name,
                    food_img,
                    counted,
                  } = x.dataValues;
                  return { food_id, food_name, food_img, like: counted.length };
                });
               if (result.length > 0) {
          res.status(200).json({ data: { recipes: result }, message: "ok" });
        } else {
          res.status(200).json({ data: {}, message: "검색 결과가 없습니다." });
        }
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
                {
                  model: Models.User,
                  as: "counted",
                },
              ],
              order: [["food_id", "ASC"]],
            })
              .then((rst) => {
                let result = rst.map((x) => {
                  let = {
                    food_id,
                    food_name,
                    food_img,
                    counted,
                  } = x.dataValues;
                  return { food_id, food_name, food_img, like: counted.length };
                });
        if (result.length > 0) {
          res.status(200).json({ data: { recipes: result }, message: "ok" });
        } else {
          res.status(200).json({ data: {}, message: "검색 결과가 없습니다." });

        }
              })
              .catch((err) => {
                res.status(200).send("fail");
              });
          } else if (type === "foodname") {
            Models.Food_info.findAll({
              include: [
                {
                  model: Models.User,
                  as: "counted",
                },
              ],
              where: { food_name: { [Op.like]: "%" + value + "%" } },
              order: [["food_id", "ASC"]],
            })
              .then((rst) => {
                let result = rst.map((x) => {
                  let = {
                    food_id,
                    food_name,
                    food_img,
                    counted,
                  } = x.dataValues;
                  return { food_id, food_name, food_img, like: counted.length };
                });
        if (result.length > 0) {
          res.status(200).json({ data: { recipes: result }, message: "ok" });
        } else {
          res.status(200).json({ data: {}, message: "검색 결과가 없습니다." });

        }
              })
              .catch((err) => {
                console.log(err);
                res.status(200).send("fail");
              });
          } else {
            res.status(400).end("fail");
          }


      })
      .catch((err) => {
        res.status(200).send("invalid user");
      });

  } catch {
    res.status(200).send("invalid access token");

  }
});

module.exports = router;
