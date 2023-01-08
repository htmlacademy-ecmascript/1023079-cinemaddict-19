import AbstractView from '../framework/view/abstract-view.js';
import { createPopupTemplate } from './popup-view.template.js';

export default class PopupView extends AbstractView {

  #comments;
  #onCloseButtonClick;

  constructor (comments, onCloseButtonClick) {
    super();
    this.#comments = comments;
    this.#onCloseButtonClick = onCloseButtonClick;

    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#onCloseButtonClick);
  }

  get template() {
    return createPopupTemplate(this.#comments);
  }
}
