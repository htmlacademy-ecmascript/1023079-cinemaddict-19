import AbstractView from '../framework/view/abstract-view.js';
import { createUserRankTemplate } from './user-profile-views.template.js';

export default class UserRankView extends AbstractView {

  get template() {
    return createUserRankTemplate();
  }

}
