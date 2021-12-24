import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".meals");

  _generateMarkup() {
    // console.log(this._data); //==> model.state.search.results
    return this._data.search.results
      .map((result) => this._generateMarkupResults(result, this._data))
      .join("");
  }

  _generateMarkupResults(results, _data) {
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
         <span>Category: <span class="category">${
           results.category
         }</span></span>
       </div>
       <svg
         class="w-6 h-6 save-fav-meal ${
           _data.bookmarks.find((bookmark) => bookmark.id === results.id)
             ? "fill"
             : ""
         }"
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

      // Prevent "a" tag to change url #hash with "preventDefault()" because
      // in "recipeView" I added the "hashchange" event. So, if I click on the
      // element, The "a" tag will change the url hash even If I clicked in the
      // "save-fav-el". To prevent this, the "preventDefault()" method of the Event
      // interface tells the user agent that if the event does not get explicitly handled,
      // its default action should not be taken as it normally would be
      if (e.target.closest(".save-fav-meal")) {
        // console.log(e.cancelable); // To know if the event is cancelable or not(true || false).
        e.preventDefault();
        return;
      }

      handler();
    });
  }

  addHandlerRandomRecipe(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerAddBookmark(handler) {
    //I need event delegation because the "save btn" doesn't exist when the app load
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".save-fav-meal");
      if (!btn) return;

      const btnClassList = btn.classList;
      const id = e.target.closest(".meal-item").getAttribute("href").slice(1); // #123456 => 123456
      const bookmarked = true;

      if (btnClassList.contains("fill")) {
        btnClassList.remove("fill");
        // REMOVE FROM BOOKMARKS ARRAY --> From the same ID
        handler(id, !bookmarked);
        return;
      }

      btnClassList.add("fill");
      handler(id, bookmarked);
    });
  }
}

export default new ResultsView();
