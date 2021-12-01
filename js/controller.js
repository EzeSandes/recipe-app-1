/*
1_ Search by ID: www.themealdb.com/api/json/v1/1/lookup.php?i=ID

2_ Search by Ingredients: https://www.themealdb.com/api/json/v1/1/search.php?s=INGREDIENT

Ej:
1_ https://www.themealdb.com/api/json/v1/1/lookup.php?i=53005

2_ https://www.themealdb.com/api/json/v1/1/search.php?s=strawberry

*/

const mealsListEl = document.querySelector(".meals");
const mealInfoContainerEl = document.querySelector(".meal-info");

function renderSpinner(parentEl) {
  const markup = `<div class="spinner">
  <svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    ></path>
  </svg>
</div>`;

  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
}

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

const showRecipe = async function () {
  try {
    renderSpinner(mealInfoContainerEl);

    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/lookup.php?i=53005"
    );

    if (!res.ok) throw new Error(`Server not available: ${res.status}`);

    const data = await res.json();

    let mealData = data.meals[0];

    const meal = {
      id: mealData.idMeal,
      title: mealData.strMeal,
      category: mealData.strCategory,
      area: mealData.strArea,
      instructions: mealData.strInstructions,
      sourceURL: mealData.strSource,
      imgURL: mealData.strMealThumb,
      ingredients: getIngredients(mealData),
    };

    console.log(meal);
    /*
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

    const markup = `
  <div class="meal-info">
    <img
      class="meal-img"
      src="${meal.imgURL}"
      alt="${meal.title}"
    />
    <div class="meal-info-body">
      <h2 class="meal-title">${meal.title}</h2>
      <div class="meal-box-feature">
        <div class="meal-feature">
          <svg
            class="w-6 h-6 popup-icons"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            ></path>
          </svg>
          <span>Category: <span class="category">${meal.category}</span></span>
        </div>
        <div class="meal-feature">
          <svg
            class="w-6 h-6 popup-icons"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span>Area: <span class="category">${meal.area}</span></span>
        </div>
      </div>
      <div class="meal-ingredients">
        <h3 class="title-ingredients">Ingredients</h3>
        <ul class="ingredients-list">
        ${meal.ingredients
          .map((ing) => {
            return `<li class="ingredient-item">
          <svg
            class="w-6 h-6 popup-icons"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <div class="ingredient-box">
            <span class="ingredient-measure">${ing.measure}</span> -
            <span class="ingredient">${ing.ingredient}</span>
          </div>
        </li>`;
          })
          .join("")}
        </ul>
      </div>

      <!-- Meal Instructions -->
      <div class="meal-intructions-box">
        <h3 class="instruction-title">Instructions</h3>
        <p class="meal-instruction">
          ${meal.instructions}
        </p>
      </div>

      <a class="meal-source" href="${meal.sourceURL}">
        <div class="meal-source-box">
          <svg
            class="w-6 h-6 popup-icons"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            ></path>
          </svg>
          <span>Source</span>
        </div>
      </a>
    </div>`;

    mealInfoContainerEl.innerHTML = "";
    mealInfoContainerEl.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    console.error("Error ⛔⛔⛔", err);
  }
};

showRecipe();
