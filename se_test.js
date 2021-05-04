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

// Models.User.findAll({}).then(console.log).catch(console.log)

let value = 'public_data_portal';

Models.User.findAll({
  include: [
    {
      model: Models.Food_info,
    },
  ],
  where: { username: value },
}).then((rst) => {
  console.log(rst)
  let result = rst[0].dataValues.map((x) => {
    let { food_id, food_name, food_image } = x.dataValues;
    return { food_id, food_name, food_image };
  });
});