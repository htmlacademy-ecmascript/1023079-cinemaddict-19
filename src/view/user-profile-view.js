import AbstractView from '../framework/view/abstract-view.js';
import { createUserProfileTemplate } from './user-profile-views.template.js';

export default class UserProfileView extends AbstractView {

  get template() {
    return createUserProfileTemplate();
  }
}
