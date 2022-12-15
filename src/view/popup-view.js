import {createElement} from '../render.js';
import { createPopupTemplate } from './popup-view.template.js';

export default class PopupView {
  constructor (comments) {
    this.comments = comments;
  }

  getTemplate() {
    return createPopupTemplate(this.comments);
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
