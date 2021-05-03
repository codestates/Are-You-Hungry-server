require("dotenv").config();
const express = require("express");
const router = express.Router();
const Models = require("../../models");
const { Op } = require("sequelize");

router.get("/likes*", (req, res) => {
  let { id, username } = res.locals;
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

router.post("/like", (req, res) => {
  let { id, username } = res.locals;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        res.status(200).end("like");
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

router.get("/uploaded*", (req, res) => {
  let { id, username } = res.locals;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        res.status(200).end("get uploaded");
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

router.get("/", (req, res) => {
  let { id, username } = res.locals;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        let { username, email, phone, userimage, createdAt } = rst.dataValues;
        res.status(200).json({
          data: {
            userinfo: { username, email, phone, userimage, createdAt },
          },
          meassge: "ok",
        });
      } else {
        res.status(200).send("invalid user");
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

router.patch("/", (req, res) => {
  let { id, username } = res.locals;

  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        Models.User.update(
          {
            username: req.body.username,
            phone: req.body.phone,
            email: req.body.email,
            userimage: req.body.userimage,
          },
          {
            where: {
              [Op.and]: [
                { id: rst.dataValues.id },
                { username: rst.dataValues.username },
              ],
            },
          }
        )
          .then((rst) => {
            res.status(200).json({ message: "information updated" });
          })
          .catch((err) => {
            res.status(200).json({ message: "updating fail" });
          });
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

router.delete("/", (req, res) => {
  let { id, username } = res.locals;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        Models.User.update(
          {
            username: "Deleted User",
            password: "",
            password2: "",
            phone: "",
            email: "",
            userimage: "",
          },
          {
            where: {
              [Op.and]: [
                { id: rst.dataValues.id },
                { username: rst.dataValues.username },
              ],
            },
          }
        )
          .then((rst) => {
            res.clearCookie("refreshToken");
            res.status(200).json({ message: "He (or She)'s gone" });
          })
          .catch((err) => {
            res.status(200).json({ message: "fail" });
          });
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

router.patch("/password", (req, res) => {
  let { id, username } = res.locals;
  Models.User.findOne({
    where: { id, username },
  })
    .then((rst) => {
      if (rst.dataValues) {
        res.status(200).end("password");
      }
    })
    .catch((err) => {
      res.status(200).send("invalid user");
    });
});

router.get("/recipe:id", (req, res) => {
  let { id } = res.locals;
  if (req.url.split(":").length != 2) {
    res.status(200).send("wrong");
  } else {
    let tfood = Number(req.url.split(":")[1]);
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

router.post("/recipe", (req, res) => {
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

router.patch("/recipe", (req, res) => {
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
