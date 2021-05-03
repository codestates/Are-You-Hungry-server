require("dotenv").config();
const express = require("express");
const router = express.Router();
const Models = require("../../../models");
const { Op } = require("sequelize");

router.get("/:id", (req, res) => {
  let { id } = res.local;
  if (isNaN(req.url.slice(1))) {
    res.status(200).send("wrong");
  } else {
    let tfood = Number(req.url.slice(1));
    Models.Food_info.findAll({
      include: [
        {
          model: Models.Ingredient,
        },
        {
          model: Models.Recipe,
        },
        {
          model: Models.User,
          as: "counted",
        },
      ],
      where: { food_id: tfood },
    })
      .then((rst) => {
        let {
          food_id,
          user_id,
          food_name,
          summary,
          nation,
          type,
          cooking_time,
          calorie,
          qnt,
          level,
          food_img,
          createdAt,
          updatedAt,
          Ingredients,
          Recipes,
          counted,
        } = rst[0].dataValues;
        let ulike = false;
        counted.forEach((x) => {
          if (x.dataValues.id === id) {
            ulike = true;
          }
        });
        Ingredients = Ingredients.map((x) => {
          let { name, type, cap } = x.dataValues;
          return { name, type, cap };
        });
        Recipes = Recipes.map((x) => {
          let { cooking_no, cooking_dc, step_image, step_tip } = x.dataValues;
          return { cooking_no, cooking_dc, step_image, step_tip };
        });
        let data = {
          food_info: {
            food_id,
            user_id,
            food_name,
            summary,
            nation,
            type,
            cooking_time,
            calorie,
            qnt,
            level,
            food_img,
            createdAt,
            updatedAt,
            like: counted.length,
            isOn: ulike,
          },
          Ingredients,
          Recipes,
        };
        res.status(200).json({ data, message: "ok" });
      })
      .catch((err) => {
        res.status(200).send("fail");
      });
  }
});

router.post("/", (req, res) => {
  let { id, username } = res.local;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        res.status(200).end("add recipe");
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

router.patch("/", (req, res) => {
  let { id, username } = res.local;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        res.status(200).end("update recipe");
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

module.exports = router;
