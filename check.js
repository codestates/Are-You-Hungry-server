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
      })
      .catch((err) => {
        console.log(err);
        console.log(food_name);
      });
  }
  for (let i of ans) {
    parm_check(i.dataValues);
  }
}
info_check();
