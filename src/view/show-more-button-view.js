import AbstractView from '../framework/view/abstract-view.js';
import { createShowMoreButtonTemplate } from './show-more-button.template.js';

export default class ShowMoreButtonView extends AbstractView {

  #onClickHandler;

  constructor(onClickHandler) {
    super();
    this.#onClickHandler = onClickHandler;

    this._restoreHandlers();
  }

  get template() {
    return createShowMoreButtonTemplate();
  }

  _restoreHandlers = () => {
    this.element.addEventListener('click', this.#onClickHandler);
  };
}
