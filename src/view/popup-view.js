import AbsractView from '../framework/view/abstract-view.js';
import { createPopupTemplate } from './popup-view.template.js';

export default class PopupView extends AbsractView {

  #comments;
  #onCloseButtonClick;

  constructor (comments, onCloseButtonClick) {
    super();
    this.#comments = comments;
    this.handleCloseButtonClick = onCloseButtonClick;

    this.element.querySelector('.film-details__close').addEventListener('click', this.handleCloseButtonClick);
  }

  get template() {
    return createPopupTemplate(this.#comments);
  }
}
