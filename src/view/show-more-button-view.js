import AbstractView from '../framework/view/abstract-view.js';
import { createShowMoreBtnTemplate } from './show-more-button.template.js';

export default class ShowMoreBtnView extends AbstractView {
  #handleClick = null;

  constructor({onClick}) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createShowMoreBtnTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };

}
