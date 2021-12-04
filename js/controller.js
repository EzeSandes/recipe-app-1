import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import { addHandlerRenderYear, setYear } from "./helpers.js";

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log("Hash: ", window.location.hash.slice(1));
    if (!id) return;

    recipeView._showPopup();

    // 0_ Loading spinner
    recipeView.renderSpinner();

    // 1_ Loading recipe
    await model.loadRecipe(id);
    //Now I have access to model.state

    // 2_ Render the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

//////////

/*
Not implemented yet: functionality to search by categories too.
*/
const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1_ Get search query
    const query = searchView.getQuery();
    if (!query) {
      resultsView.renderError("No term to search! Please try again");
      return;
    }

    // 2_Load search results. Only manipulate the state.
    await model.loadSearchResults(query);

    // 3_ Render results.
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const controlRandomResult = async function () {
  try {
    resultsView.renderSpinner();

    await model.loadRandomRecipe();

    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

//////////

const controlDisplayRecipe = function () {
  // 1_ Show popup
  recipeView._showPopup();
};

const controlCopyrightYear = function () {
  setYear();
};
//////////

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerClosePopup();
  searchView.addHandlerSearch(controlSearchResults);
  resultsView.addHandlerShowRecipe(controlDisplayRecipe);
  resultsView.addHandlerRandomRecipe(controlRandomResult);

  addHandlerRenderYear(controlCopyrightYear);
};

init();
