import {createElement} from '../render.js';
import { createUserProfileTemplate } from './user-profile-views.template.js';

export default class UserProfileView {
  #element;

  get template() {
    return createUserProfileTemplate();
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
