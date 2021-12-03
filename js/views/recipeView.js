import View from "./View.js";

class RecipeView extends View {
  _parentElement = document.querySelector(".meal-info");
  _popup = document.querySelector(".popup-container");

  _errorMessage = "We could not find that recipe. Please try another one!";

  //Only return an HTML String
  _generateMarkup() {
    return `
     <img
       class="meal-img"
       src="${this._data.imgURL}"
       alt="${this._data.title}"
     />
     <div class="meal-info-body">
       <h2 class="meal-title">${this._data.title}</h2>
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
             this._data.category
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
           <span>Area: <span class="category">${this._data.area}</span></span>
         </div>
       </div>
       <div class="meal-ingredients">
         <h3 class="title-ingredients">Ingredients</h3>
         <ul class="ingredients-list">
         ${this._data.ingredients.map(this._generateMarkupIngredients).join("")}
         </ul>
       </div>
 
       <!-- Meal Instructions -->
       <div class="meal-intructions-box">
         <h3 class="instruction-title">Instructions</h3>
         <p class="meal-instruction">
           ${this._data.instructions}
         </p>
       </div>
 
       <a class="meal-source" href="${this._data.sourceURL}">
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

  _generateMarkupIngredients(ing) {
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
    ["hashchange", "load"].forEach((typeEvent) =>
      window.addEventListener(typeEvent, handler)
    );
  }

  addHandlerClosePopup() {
    this._popup
      .querySelector(".btn-close-popup")
      .addEventListener("click", () => {
        /*Warning!: Here I can't use "this._popup" with a normal function "function(){}" 
        declaration because "this" will not linked to nothing. 
        Instead, use an arrow function witch will not have acces to the "this" keyword 
        => "this._popup" will only be linked to the protected variable.
         */
        this._popup.classList.toggle("hidden");
      });
  }

  _showPopup() {
    this._popup.classList.remove("hidden"); // Not "toggle()". Bug fixed :)
  }
}

export default new RecipeView();
