import AbstractView from '../framework/view/abstract-view.js';
import { createUserRankTemplate } from './user-profile-views.template.js';

export default class UserRankView extends AbstractView {
  #watchedFilmsCount;

  constructor({ watchedFilmsCount }) {
    super();

    this.#watchedFilmsCount = watchedFilmsCount;
  }

  get template() {
    return createUserRankTemplate(this.#watchedFilmsCount);
  }

}
