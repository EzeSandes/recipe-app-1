import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import { addHandlerRenderYear, setYear } from "./helpers.js";

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
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
    resultsView.render(model.state);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlRandomResult = async function () {
  try {
    resultsView.renderSpinner();

    await model.loadRandomRecipe();

    resultsView.render(model.state);
  } catch (err) {
    resultsView.renderError();
  }
};

// Add / Delete Bookmark
const controlAddRemoveBookmark = async function (id, bookmarked = false) {
  try {
    if (bookmarked) {
      await model.loadRecipe(id);
      model.addBookmark(model.state.recipe);
    } else model.deleteBookmark(id);

    // Render bookmarks
    bookmarksView.render(model.state.bookmarks);

    // Change the Fav Icons if it is deleted from bookmarks
    if (!bookmarked) resultsView.render(model.state);
  } catch (err) {
    console.error("⛔ERROR: BOOKMARKS⛔");
  }
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
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
  resultsView.addHandlerRandomRecipe(controlRandomResult);
  resultsView.addHandlerShowRecipe(controlDisplayRecipe);
  resultsView.addHandlerAddBookmark(controlAddRemoveBookmark);
  bookmarksView.addHandlerShowBookmarkRecipe(controlDisplayRecipe);
  bookmarksView.addHandlerDeleteBookmark(controlAddRemoveBookmark);
  bookmarksView.addHandlerRender(controlBookmarks);

  addHandlerRenderYear(controlCopyrightYear);
};

init();
