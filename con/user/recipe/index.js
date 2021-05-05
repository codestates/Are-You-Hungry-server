require("dotenv").config();
const express = require("express");
const router = express.Router();
const Models = require("../../../models");
const { Op, Model } = require("sequelize");

router.get("/:id", (req, res) => {
  let { id } = res.locals;
  if (isNaN(req.url.slice(1))) {
    res.status(400).send("fail");
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
          Food_info: {
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
        res.status(400).send("fail");
      });
  }
});

router.post("/", (req, res) => {
  let { id, username } = res.locals;
  let { Food_info, Recipe, Ingredients } = req.body;
  Models.Food_info.max("food_id")
    .then((rst) => {
      let nid = rst + 1;
      Models.Food_info.create({
        ...Food_info,
        user_id: id,
        food_id: nid,
        food_img: Food_info.food_img ? Food_info.food_img : "",
      });
      return nid;
    })
    .then((nid) => {
      Recipe = Recipe.map((x) => {
        return {
          ...x,
          food_id: nid,
          step_image: Recipe.step_image ? Recipe.step_image : "",
        };
      });
      Models.Recipe.bulkCreate(Recipe);
      return nid;
    })
    .then((nid) => {
      Ingredients = Ingredients.map((x) => {
        return { ...x, food_id: nid };
      });
      Models.Ingredient.bulkCreate(Ingredients);
    })
    .then(() => {
      res.status(200).json({ message: "ok" });
    })
    .catch((err) => {
      res.status(200).send("fail");
    });
});

router.patch("/", (req, res) => {
  let { id, username } = res.locals;
  Models.Food_info.findAll({
    where: { [Op.and]: [{ user_id: id }, { food_id: req.food_id }] },
  })
    .then(() => {
      Models.Food_info.create({
        ...req.body.Food_info,
      });
    })
    .then(() => {
      Models.Recipe.create({
        ...req.body.Recipe,
      });
    })
    .then(() => {
      Models.Ingredient.create({
        ...req.body.Ingredient,
      });
    })
    .then(() => {
      res.status(200).json({ message: "ok" });
    })
    .catch((err) => {
      res.status(400).send("fail");
    });
});

module.exports = router;
