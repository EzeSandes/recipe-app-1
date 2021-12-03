import View from "./View.js";

class SearchView extends View {
  _parentEl = document.querySelector(".search");

  getQuery() {
    const query = this._parentEl.querySelector(".search-term").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector(".search-term").value = "";
  }

  addHandlerSearch(handler) {
    //"submit": No matter if the user press "Enter" or "Click" the search button
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
