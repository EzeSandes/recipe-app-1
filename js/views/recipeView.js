class RecipeView {
  #parentElement = document.querySelector(".meal-info");
  #data; // recipe obj
  #errorMessage = "We could not find that recipe. Please try another one!";

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  renderSpinner() {
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

    this.#parentElement.innerHTML = "";
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this.#errorMessage) {
    const markup = `
    <div class="error">
            <svg
              class="w-6 h-6 error-meal-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            <p class="error-msg">${message}</p>
          </div>
    `;

    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  //Only return an HTML String
  #generateMarkup() {
    return `
   <div class="meal-info">
     <img
       class="meal-img"
       src="${this.#data.imgURL}"
       alt="${this.#data.title}"
     />
     <div class="meal-info-body">
       <h2 class="meal-title">${this.#data.title}</h2>
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
           <span>Category: <span class="category">${
             this.#data.category
           }</span></span>
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
           <span>Area: <span class="category">${this.#data.area}</span></span>
         </div>
       </div>
       <div class="meal-ingredients">
         <h3 class="title-ingredients">Ingredients</h3>
         <ul class="ingredients-list">
         ${this.#data.ingredients.map(this.#generateMarkupIngredients).join("")}
         </ul>
       </div>
 
       <!-- Meal Instructions -->
       <div class="meal-intructions-box">
         <h3 class="instruction-title">Instructions</h3>
         <p class="meal-instruction">
           ${this.#data.instructions}
         </p>
       </div>
 
       <a class="meal-source" href="${this.#data.sourceURL}">
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
  }

  #generateMarkupIngredients(ing) {
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
  }

  addHandlerRender(handler) {
    ["load"].forEach((typeEvent) =>
      window.addEventListener(typeEvent, handler)
    );
  }

  addHandlerClosePopup() {
    this.#parentElement.previousElementSibling.addEventListener(
      "click",
      function (e) {
        e.target.closest(".popup-container").classList.toggle("hidden");
      }
    );
  }
}

export default new RecipeView();
