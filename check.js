require("dotenv").config();
const {
  Food_info,
  Food_type,
  Igr,
  Igr_cap,
  Igr_type,
  Ingredient,
  Nation,
  Recipe,
} = require("./models");
const axios = require("axios");
const API_KEY = process.env.API_KEY;
//let cmd = `http://211.237.50.150:7080/openapi/${API_KEY}/json/Grid_20150827000000000226_1/1/10/?RECIPE_NM_KO=${food_name}`;
async function info_check() {
  let ans = await Food_info.findAll({});
  async function parm_check({
    id,
    food_name,
    summary,
    nation_id,
    type_id,
    cooking_time,
    calorie,
    qnt,
    level,
    irdnt_code,
    price,
    food_img,
  }) {
    let cmd = `http://211.237.50.150:7080/openapi/${API_KEY}/json/Grid_20150827000000000226_1/1/10/?RECIPE_NM_KO=${encodeURI(
      food_name
    )}`;
    await axios
      .get(cmd)
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        return res;
      })
      .then((res) => res["Grid_20150827000000000226_1"])
      .then((res) => res.row)
      .then(async (res) => {
        let {
          RECIPE_ID,
          RECIPE_NM_KO,
          SUMRY,
          NATION_CODE,
          NATION_NM,
          TY_CODE,
          TY_NM,
          COOKING_TIME,
          CALORIE,
          QNT,
          LEVEL_NM,
          IRDNT_CODE,
          PC_NM,
          IMG_URL,
        } = res[0];
        if (
          RECIPE_NM_KO !== food_name ||
          SUMRY !== summary ||
          COOKING_TIME !== cooking_time ||
          CALORIE !== calorie ||
          qnt !== QNT ||
          LEVEL_NM !== level ||
          IRDNT_CODE !== irdnt_code ||
          PC_NM !== price ||
          IMG_URL !== food_img
        ) {
          console.log(`${id} wrong`);
          console.log(
            id,
            food_name,
            summary,
            nation_id,
            type_id,
            cooking_time,
            calorie,
            qnt,
            level,
            irdnt_code,
            price,
            food_img
          );
          console.log(res[0]);
        }
        // let ans = await Nation.findOne({ where: { name: NATION_NM } });
        // if (ans === null) {
        //   let p = await Nation.create({ code: NATION_CODE, name: NATION_NM });
        //   nation_id = p.dataValues.id;
        // } else {
        //   nation_id = ans.dataValues.id;
        // }
        // ans = await Food_type.findOne({ where: { name: TY_NM } });
        // if (ans === null) {
        //   let p = await Food_type.create({ code: TY_CODE, name: TY_NM });
        //   type_id = p.dataValues.id;
        // } else {
        //   type_id = ans.dataValues.id;
        // }
        // ans = await Food_info.findOne({ where: { id: RECIPE_ID } });
        // if (ans === null) {
        //   ans = await Food_info.create({
        //     user_id: 2,
        //     food_name: RECIPE_NM_KO,
        //     summary: SUMRY,
        //     nation_id,
        //     type_id,
        //     cooking_time: COOKING_TIME,
        //     calorie: CALORIE,
        //     qnt: QNT,
        //     level: LEVEL_NM,
        //     irdnt_code: IRDNT_CODE,
        //     price: PC_NM,
        //     food_img: IMG_URL,
        //   });
        // }
      })
      .catch((err) => {
        console.log(err);
        console.log(food_name);
      });
  }
  for (let i of ans) {
    parm_check(i.dataValues);
  }
  //  parm_check(ans[0].dataValues);
}
info_check();
