import {createElement} from '../render.js';
import { createShowMoreButtonTemplate } from './show-more-button.template.js';

export default class ShowMoreButtonView {
  #element;

  get template() {
    return createShowMoreButtonTemplate();
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
