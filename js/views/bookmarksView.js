import View from "./View.js";

class BookmarksView extends View {
  _parentElement = document.querySelector(".fav-meals");
  _errorMessage = "No bookmarks yet :(";

  _generateMarkup() {
    // this._data === model.state.bookmarks
    console.log(this._data);
    return this._data.map(this._generateMarkupBookmarks).join("");
  }

  _generateMarkupBookmarks(bookmark) {
    return `<li class="fav-item">
    <a href="#${bookmark.id}" class="fav-preview">
      <img
        class="fav-meal-img"
        src="${bookmark.imgURL}/preview"
        alt="${bookmark.title}"
      />
      <span class="fav-name">${bookmark.title}</span>
      <svg
        class="w-6 h-6 delete-fav-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </a>
  </li>`;
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  addHandlerShowBookmarkRecipe(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (
        !e.target.closest(".fav-item") ||
        e.target.closest(".delete-fav-icon")
      )
        return;

      handler();
    });
  }

  addHandlerDeleteBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (!e.target.closest(".delete-fav-icon")) return;

      e.preventDefault(); // To prevent the "a" tag to change the hash URL
      const id = e.target.closest(".fav-preview").getAttribute("href").slice(1);

      handler(id, false); // false === !Bookmarked === Delete it
    });
  }
}

export default new BookmarksView();
