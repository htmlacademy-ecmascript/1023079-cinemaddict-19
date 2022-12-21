import {createElement} from '../render.js';
import { createLoadingPageTemplate } from './loading-page-view.template.js';

export default class LoadingPageView {
  #element;

  get template() {
    return createLoadingPageTemplate();
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
