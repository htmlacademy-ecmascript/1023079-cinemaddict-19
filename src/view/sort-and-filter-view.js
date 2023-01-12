import AbstractView from '../framework/view/abstract-view.js';
import { createFilterTemplate } from './sort-and-filter.template.js';

export default class FilterView extends AbstractView {

  #onSortByDataClick;
  #onSortByRatingClick;
  #onSortByDefaultClick;

  constructor(onSortByDataClick, onSortByRatingClick, onSortByDefaultClick) {
    super();
    this.#onSortByDataClick = onSortByDataClick;
    this.#onSortByRatingClick = onSortByRatingClick;
    this.#onSortByDefaultClick = onSortByDefaultClick;

    this.element.querySelector('.sort-type-date').addEventListener('click', this.#onSortByDataClick);
    this.element.querySelector('.sort-type-rating').addEventListener('click', this.#onSortByRatingClick);
    this.element.querySelector('.sort-type-default').addEventListener('click', this.#onSortByDefaultClick);
  }

  get template() {
    return createFilterTemplate();
  }
}
