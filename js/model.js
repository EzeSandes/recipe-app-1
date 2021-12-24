/*
1_ Search by ID: www.themealdb.com/api/json/v1/1/lookup.php?i=ID

2_ Search by Ingredients: https://www.themealdb.com/api/json/v1/1/search.php?s=INGREDIENT

3_ Search random meal: https://www.themealdb.com/api/json/v1/1/random.php

4_Future functionality: Search by categorie -> https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert

Ej:
1_ https://www.themealdb.com/api/json/v1/1/lookup.php?i=53005

2_ https://www.themealdb.com/api/json/v1/1/search.php?s=strawberry

*/

import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

//All recipes will stay here. This is the "conductor" from each MVC file
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
  },
  bookmarks: [],
};

////////

function getIngredients(meal) {
  let ingredients = [];
  let measures = [];

  // 1) Get ingredients and measures from the meal object in != arrays
  Object.keys(meal).forEach((el) => {
    if (el.startsWith("strIngredient") && meal[el] !== "")
      ingredients.push(meal[el]);

    if (el.startsWith("strMeasure") && meal[el] !== " ")
      measures.push(meal[el]);
  });

  // 2) Create the obj with ingredients and measures linked
  const ingrAndMeasures = ingredients.map((ingr, i) => {
    return {
      ingredient: ingr,
      measure: measures[i],
    };
  });

  return ingrAndMeasures;
}

////////

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}lookup.php?i=${id}`);
    //Ej_id: 53005

    let mealData = data.meals[0];

    state.recipe = {
      id: mealData.idMeal,
      title: mealData.strMeal,
      category: mealData.strCategory,
      area: mealData.strArea,
      instructions: mealData.strInstructions,
      sourceURL: mealData.strSource,
      imgURL: mealData.strMealThumb,
      ingredients: getIngredients(mealData),
    };
  } catch (err) {
    console.error("Error ⛔⛔⛔", err);
    throw err;
  }
};

async function getDataStateSearch(url) {
  try {
    const data = await getJSON(url);

    state.search.results = data.meals.map((meal) => {
      return {
        id: meal.idMeal,
        title: meal.strMeal,
        category: meal.strCategory,
        imgURL: meal.strMealThumb,
      };
    });
  } catch (err) {
    throw err;
  }
}

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    await getDataStateSearch(`${API_URL}search.php?s=${query}`);
  } catch (err) {
    console.error("Error ⛔⛔⛔", err);
    throw err;
  }
};

export const loadRandomRecipe = async function () {
  try {
    await getDataStateSearch(`${API_URL}random.php`);

    state.recipe.id = state.search.results[0].id;
  } catch (err) {
    console.error("Error ⛔⛔⛔", err);
    throw err;
  }
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  //"state.recipe.id": The one that is currently load
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (recipeID) {
  const index = state.bookmarks.findIndex((recipe) => recipe.id === recipeID);
  state.bookmarks.splice(index, 1);

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
