const Models = require("./models");
const seq = require("sequelize");
// const { Model } = require("sequelize");

// let [id, username] = [1, "admin"];
// let value = "public_data_portal";
// Models.Food_info.findAll({
//   attributes: ["food_id", "food_name", "food_img", "user_id"],
//   include: [
//     {
//       model: Models.User,
//       attributes: ["id"],
//       where: { username: value },
//     },
//     {
//       model: Models.User,
//       as: "counted",
//     },
//   ],
//   where: { food_id: { [seq.Op.lte]: 30 } },
//   order: [["food_id", "ASC"]],
// })
//   .then((rst) => {
//     let result = rst.map((x) => {
//       let = { food_id, food_name, food_img, counted } = x.dataValues;
//       console.log(food_id, food_name, food_img, counted.length);
//       return {
//         food_id,
//         food_name,
//         food_img,
//         like: counted.length,
//       };
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Models.User.findAll({
//   attributes: ["id", "username"],
//   include: [
//     // {
//     //   model: Models.Food_info,
//     //   attributes: ["food_id", "food_name", "food_img", "user_id"],
//     //   as: "liked",
//     // },
//     // {
//     //   model: Models.Food_info,
//     //   attributes: ["food_id", "food_name", "food_img", "user_id"],
//     //   where: {
//     //     [Op.and]: [{ "$User.id$": "user_id" }, { "$User.username$": value }],
//     //   },
//     // },
//   ],
// })
//   .then((rst) => {
//     console.log(rst);
//     // console.log(rst[0].dataValues.liked);
//     // console.log(rst[0].dataValues.Food_infos);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Models.Food_info.findAll({
//   attributes: ["food_id", "food_name", "food_img", "user_id"],
//   include: [
//     {
//       model: Models.User,
//       attributes: ["id"],
//       where: { username: value },
//       include: [
//         {
//           model: Models.Food_info,
//           as: "liked",
//         },
//       ],
//     },
//     {
//       model: Models.User,
//       as: "counted",
//     },
//   ],
//   where: { food_id: { [seq.Op.lte]: 30 } },
//   order: [["food_id", "ASC"]],
// })
//   .then((rst) => {
//     let ulike = rst[0].dataValues.User.liked.reduce((acc, x) => {
//       acc[x.dataValues.food_id] = true;
//       return acc;
//     }, {});
//     console.log(ulike);
//     let result = rst.map((x) => {
//       let = { food_id, food_name, food_img, counted } = x.dataValues;
//       console.log(
//         food_id,
//         food_name,
//         food_img,
//         counted.length,
//         ulike[food_id] ? true : false
//       );
//       return {
//         food_id,
//         food_name,
//         food_img,
//         like: counted.length,
//         isOn: ulike[food_id] ? true : false,
//       };
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// -----------------------------------
// let value = "고추";

// Models.Food_info.findAll({
//   include: [
//     {
//       model: Models.Ingredient,
//       where: { name: { [seq.Op.like]: "%" + value + "%" } },
//     },
//     {
//       model: Models.User,
//       as: "counted",
//     },
//     {
//       model: Models.User,
//       include: [
//         {
//           model: Models.Food_info,
//           as: "liked",
//         },
//       ],
//     },
//   ],
//   order: [["food_id", "ASC"]],
// }).then((rst) => {
//   console.log(rst);
//   //   let ulike = rst[0].dataValues.User.liked.reduce((acc, x) => {
//   //     acc[x.dataValues.food_id] = true;
//   //     return acc;
//   //   }, {});
//   //   console.log(ulike);
//   let result = rst.map((x) => {
//     let = { food_id, food_name, food_img, counted } = x.dataValues;
//     return {
//       food_id,
//       food_name,
//       food_img,
//       like: counted.length,
//       //   isOn: ulike[food_id] ? true : false,
//     };
//   });
// });

//Models.User.findAll({}).then(console.log).catch(console.log);
// Models.User.update(
//   { username: "admin", phone: "000-0000-0000" },
//   { where: { id: 1 } }
// );

// Models.Food_info.findAll({
//   include: [
//     {
//       model: Models.Ingredient,
//     },
//     {
//       model: Models.Recipe,
//     },
//     {
//       model: Models.User,
//       as: "counted",
//     },
//     {
//       model: Models.User,
//       include: {
//         model: Models.Food_info,
//         as: "liked",
//       },
//     },
//   ],
//   where: { food_id: 1 },
// }).then((rst) => {
//   console.log(rst);
//   let {
//     food_id,
//     user_id,
//     food_name,
//     summary,
//     nation,
//     type,
//     cooking_time,
//     calorie,
//     qnt,
//     level,
//     food_img,
//     createdAt,
//     updatedAt,
//     Ingredients,
//     Recipes,
//     counted,
//     User,
//   } = rst[0].dataValues;
//   let ulike = rst[0].dataValues.User.liked.reduce((acc, x) => {
//     acc[x.dataValues.food_id] = true;
//     return acc;
//   }, {});
//   Ingredients = Ingredients.map((x) => {
//     let { name, type, cap } = x.dataValues;
//     return { name, type, cap };
//   });
//   Recipes = Recipes.map((x) => {
//     let { cooking_no, cooking_dc, step_image, step_tip } = x.dataValues;
//     return { cooking_no, cooking_dc, step_image, step_tip };
//   });
//   console.log(
//     food_id,
//     user_id,
//     food_name,
//     summary,
//     nation,
//     type,
//     cooking_time,
//     calorie,
//     qnt,
//     level,
//     food_img,
//     createdAt,
//     updatedAt
//   );
//   console.log(Recipes);
//   console.log(Ingredients);
//   console.log(counted);
// });
// let value = "Public_data_portal";
// Models.User.findAll({
//   include: [
//     {
//       model: Models.Food_info,
//       as: "liked",
//     },
//   ],
//   where: { username: value },
// }).then((rst) => {
//   let result = rst[0].dataValues.liked.map((x) => {
//     let { food_id, food_name, food_img } = x.dataValues;
//     console.log(food_id, food_name, food_img);
//     return { food_id, food_name, food_img };
//   });
// });

// Models.User.findAll({
//   where: { username: value },
//   include: {
//     model: Models.Food_info,
//   },
// }).then((rst) => {
//   // for (let i of rst) {
//   //   console.log(i.dataValues.id, i.dataValues.Food_infos.length);
//   // }
//   console.log(rst);
// });

// Models.Food_info.findAll({
//   include: {
//     model: Models.User,
//     as: "counted",
//     where: { id: 1 },
//   },
// }).then((rst) => {
//   for (let i of rst) {
//     console.log(i.dataValues.food_id, i.dataValues.counted.length);
//   }
//   // console.log(rst);
// });

// Models.User.findAll({
//   include: {
//     model: Models.Food_info,
//     as: "liked",
//   },
// }).then((rst) => {
//   for (let i of rst) {
//     for (j of i.dataValues.liked) {
//       console.log(
//         i.dataValues.id,
//         i.dataValues.liked.length,
//         j.dataValues.food_id,
//         j.dataValues
//       );
//     }
//   }
//   // console.log(rst);
// });
// Models.Food_info.findAndCountAll({})
//   .then((rst) => console.log(rst.count + 1))
//   .catch(console.log);
// Models.Food_info.max("food_id").then(console.log).catch(console.log);

// // Models.User.findAll({}).then(console.log).catch(console.log)

// let value = 'public_data_portal';

// Models.User.findAll({
//   include: [
//     {
//       model: Models.Food_info,
//     },
//   ],
//   where: { username: value },
// }).then((rst) => {
//   console.log(rst)
//   let result = rst[0].dataValues.map((x) => {
//     let { food_id, food_name, food_image } = x.dataValues;
//     return { food_id, food_name, food_image };
//   });
// });

// let value = "public_data_portal";

// Models.User.findOne({
//   include: [
//     {
//       model: Models.Food_info,
//       include: [
//         {
//           model: Models.User,
//           as: "counted",
//         },
//       ],
//     },
//   ],
//   where: { username: value },
// })
//   .then((rst) => {
//     // console.log(rst.dataValues.liked);
//     let result = rst.dataValues.Food_infos.map((x) => {
//       let { food_id, food_name, food_img, counted } = x.dataValues;
//       if (counted.length > 0 ? true : false) {
//         console.log(food_id, food_name, food_img);
//       }

//       return {
//         food_id,
//         food_name,
//         food_img,
//         isOn: counted.length > 0 ? true : false,
//       };
//     });
//   })
//   .catch((err) => {});

let tfood = 195454;
Models.Food_info.findAll({
  include: [
    {
      model: Models.Ingredient,
      on: { food_id: tfood },
    },
    {
      model: Models.Recipe,
      on: { food_id: tfood },
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
    console.log(data);
  })
  .catch((err) => {});
