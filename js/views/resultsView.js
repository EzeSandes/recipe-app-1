import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".meals");

  _generateMarkup() {
    // console.log(this._data);

    return this._data.map(this._generateMarkupResults).join("");
  }

  _generateMarkupResults(results) {
    return `<li class="meal-preview">
   <a href="#${results.id}" class="meal-item">
     <img
       class="meal-img"
       src="${results.imgURL}"
       alt="${results.title}"
     />
     <div class="meal-text-body">
       <div class="meal-text-box">
         <h3 class="meal-name">${results.title}</h3>
         <span>Category: <span class="category">${results.category}</span></span>
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
  }

  addHandlerShowRecipe(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (!e.target.closest(".meal-preview")) return;

      handler();
    });
  }

  addHandlerRandomRecipe(handler) {
    window.addEventListener("load", handler);
  }
}

export default new ResultsView();
