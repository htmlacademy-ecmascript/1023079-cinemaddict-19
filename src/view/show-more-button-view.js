import AbsractView from '../framework/view/abstract-view.js';
import { createShowMoreButtonTemplate } from './show-more-button.template.js';

export default class ShowMoreButtonView extends AbsractView {

  #onClickHandler;

  constructor(onClickHandler) {
    super();
    this.#onClickHandler = onClickHandler;
    this.element.addEventListener('click', this.#onClickHandler);
  }

  get template() {
    return createShowMoreButtonTemplate();
  }
}
