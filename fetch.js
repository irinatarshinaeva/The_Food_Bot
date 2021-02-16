global.fetch = require('node-fetch');

function allCategotyList() {
  return new Promise((resolve, reject) => {
    let result;
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let arrOfCategories = [];
        for (let i = 0; i < data.meals.length; i++) {
          arrOfCategories.push(Object.values(data.meals[i]));
        }
        result = arrOfCategories.flat();
        let arr = [];
        for (let i = 0; i < result.length; i++) {
          arr.push([{ text: result[i], callback_data: result[i] }]);
        }
        resolve(arr);
      })
      .catch((err) => reject(err));
  });
}

function allCategotyList2() {
  return new Promise((resolve, reject) => {
    let result;
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let arrOfCategories = [];
        for (let i = 0; i < data.meals.length; i++) {
          arrOfCategories.push(Object.values(data.meals[i]));
        }
        result = arrOfCategories.flat();
        resolve(result);
      })
      .catch((err) => reject(err));
  });
}

function infoRecipe(mealName) {
  return new Promise((resolve, reject) => {
    let result;
    fetch(
      `https://www.themealdb.com/api/json/v2/9973533/search.php?s=${mealName}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const info = data.meals[0];
        const regExIngr = /strIngredient\d/;
        const regExMeas = /strMeasure\d/;

        let products = [];
        let measurement = [];
        let ingredients = '';

        for (const [key, value] of Object.entries(info)) {
          if (value) {
            if (regExIngr.test(key)) {
              products.push(value);
            }

            if (regExMeas.test(key)) {
              measurement.push(value);
            }
          }
        }
        for (let i = 0; i < products.length; i++) {
          ingredients += `${products[i]} : ${measurement[i]}\n`;
        }

        result =
          mealName +
          '\n\n' +
          ingredients +
          '\n' +
          info.strInstructions +
          '\n\n' +
          info.strYoutube +
          '\n\n' +
          info.strMealThumb +
          '\n\n' +
          info.strSource;
        resolve(result);
      })
      .catch((e) => reject(e));
  });
}

function insertIngredients(ingredients) {
  return new Promise((resolve, reject) => {
    let arrOfMeals;
    fetch(
      `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${ingredients}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let arrOfMeals = [];

        for (let i = 0; i < data.meals.length; i++) {
          const meal = data.meals[i].strMeal;
          arrOfMeals.push(meal);
        }
        resolve(arrOfMeals);
      });
  });
}

function mealsOfOneCategory(meal) {
  return new Promise((resolve, reject) => {
    let result;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        result = [];
        for (let i = 0; i < data.meals.length; i++) {
          result.push(data.meals[i].strMeal);
        }
        resolve(result);
      })
      .catch((e) => reject(e));
  });
}

async function buttonsCategotyList(f) {
  let allCategotyList = await f;
  // console.log(allCategotyList);
  let arr = [];
  for (let i = 0; i < allCategotyList.length; i++) {
    arr.push([{ text: allCategotyList[i], callback_data: allCategotyList[i] }]);
  }
  return arr;
}

module.exports = {
  infoRecipe,
  mealsOfOneCategory,
  buttonsCategotyList,
  allCategotyList,
  allCategotyList2,
  insertIngredients,
};
