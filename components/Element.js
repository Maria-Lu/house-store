export default class Element {
  constructor(elementTemplateSelector) {
    this._elementSelector = elementTemplateSelector
  }

  _getTemplate() {
    const element = document
    .querySelector(this._elementSelector)
    .content
    .cloneNode(true);

    return element;
  }


}
