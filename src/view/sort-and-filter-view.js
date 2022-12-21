import {createElement} from '../render.js';
import { createFilterTemplate } from './sort-and-filter.template.js';

export default class FilterView {
  #element;

  get template() {
    return createFilterTemplate();
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
