import AbstractView from '../framework/view/abstract-view.js';
import { createSortTemplate } from './sort.template.js';
import { SortType } from '../consts.js';

export default class SortView extends AbstractView {
  #handleSortTypeChange;
  #currentSortType = SortType.DEFAULT;

  constructor(onSortTypeChange, currentSortType) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.#currentSortType = currentSortType;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.dataset.sortType) {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
