import AbsractView from '../framework/view/abstract-view.js';
import { createUserProfileTemplate } from './user-profile-views.template.js';

export default class UserProfileView extends AbsractView {

  get template() {
    return createUserProfileTemplate();
  }
}
