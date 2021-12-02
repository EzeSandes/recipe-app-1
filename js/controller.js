import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log("Hash: ", window.location.hash);
    if (!id) return;

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

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerClosePopup();
};

init();

// NOT IMPLEMENTED YET
/*
const mealsListEl = document.querySelector(".meals");

    const markup = `<li class="meal-preview">
    <a href="${meal.id}" class="meal-item">
      <img
        class="meal-img"
        src="${meal.imgURL}"
        alt="${meal.title}"
      />
      <div class="meal-text-body">
        <div class="meal-text-box">
          <h3 class="meal-name">${meal.title}</h3>
          <span>Category: <span class="category">${meal.category}</span></span>
        </div>
        <svg
          class="w-6 h-6 save-fav-meal"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
      </div>
    </a>
  </li>`;
  
  mealsListEl.innerHTML = "";
  mealsListEl.insertAdjacentHTML("beforeend", markup);
  */
