import {createElement} from '../render.js';
import { createUserProfileTemplate } from './user-profile-views.template.js';

export default class UserProfileView {
  getTemplate() {
    return createUserProfileTemplate();
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
