import {createElement} from '../render.js';
import { createPopupTemplate } from './popup-view.template.js';

export default class PopupView {
  getTemplate() {
    return createPopupTemplate();
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
