import {createElement} from '../render.js';
import { createPopupTemplate } from './popup-view.template.js';

export default class PopupView {
  #comments;
  #element;

  constructor (comments) {
    this.#comments = comments;
  }

  get template() {
    return createPopupTemplate(this.#comments);
  }

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
