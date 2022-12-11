import {createElement} from '../render.js';
import { createShowMoreButtonTemplate } from './show-more-button.template.js';

export default class ShowMoreButtonView {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
