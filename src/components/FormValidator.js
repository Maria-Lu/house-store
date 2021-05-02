export default class FormValidator {
  constructor({inputSelector, submitButtonSelector, inactiveButtonClass,
    inputErrorClass, inactiveInputClass}, formElement) {
      this._inputSelector = inputSelector;
      this._submitButtonSelector = submitButtonSelector;
      this._inactiveButtonClass = inactiveButtonClass;
      this._inputErrorClass = inputErrorClass;
      this._inactiveInputClass = inactiveInputClass;
      this._formElement = formElement
  }

   _setEventListeners() {
     this._inputList = Array.from(this._formElement
      .querySelectorAll(this._inputSelector))
      .filter((inputElement) => inputElement.name !== 'promo');

     this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

     this._toggleButtonState();

     this._inputList.forEach((inputElement) => {
       inputElement.addEventListener('input', () => {
         this._checkInputValidity(inputElement);
         this._toggleButtonState();
        });
      });
    }

    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }

    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        inputElement.classList.add(this._inputErrorClass);
      } else {
        inputElement.classList.remove(this._inputErrorClass);
      }
    }

    _toggleButtonState() {
      if (this._hasInvalidInput(this._inputList)) {
        this.disableButton();
      } else {
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.removeAttribute('disabled');
      }
    }

    isPromoValid() {
      this._promoInputElement = Array.from(this._formElement
        .querySelectorAll(this._inputSelector))
        .find((inputElement) => inputElement.name === 'promo');
      return this._promoInputElement.value === '1010';
    }

    disableButton() {
      this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    }

    disableInputs(){
      this._inputs = Array.from(this._formElement
        .querySelectorAll(this._inputSelector));
        this._inputs.forEach((inputElement) => {
          inputElement.setAttribute('disabled', true);
          inputElement.classList.add(this._inactiveInputClass);
         });

    }

    enableValidation() {
      this._setEventListeners();
    }

}
