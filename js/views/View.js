/*
   I can't access private variables or methods in the child class. So, I have to
    keep this methods and variables "protected" to be accesible from the childs.

   I can use "super()" constructor with _parentElement too:

   View class:
      _parentElement;
      constructor(parentElement){
         this._parentElement = parentElement;
      }

   Child class:

   constructor(){
      super(document.querySelector(".<name>"))
   }

   Important: _parentElement will be unique from each class, so I don't change it.
*/

//Export only the class to use it like a parent class. No instance
export default class View {
  //   _parentElement;
  _data; // recipe obj

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
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

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
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

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
