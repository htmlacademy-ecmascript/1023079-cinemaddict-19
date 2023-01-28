import AbstractView from '../framework/view/abstract-view.js';
import { createSortTemplate } from './sort.template.js';

export default class SortView extends AbstractView {

  #onSortByDataClick;
  #onSortByRatingClick;
  #onSortByDefaultClick;

  constructor(onSortByDataClick, onSortByRatingClick, onSortByDefaultClick) {
    super();
    this.#onSortByDataClick = onSortByDataClick;
    this.#onSortByRatingClick = onSortByRatingClick;
    this.#onSortByDefaultClick = onSortByDefaultClick;

    this._restoreHandlers();
  }

  get template() {
    return createSortTemplate();
  }

  #sortByDataHandler = () => {
    this.#onSortByDataClick();

    this.element.querySelector('.sort-type-date').classList.add('sort__button--active');
    this.element.querySelector('.sort-type-default').classList.remove('sort__button--active');
    this.element.querySelector('.sort-type-rating').classList.remove('sort__button--active');
  };

  #sortByRatingHandler = () => {
    this.#onSortByRatingClick();

    this.element.querySelector('.sort-type-date').classList.remove('sort__button--active');
    this.element.querySelector('.sort-type-default').classList.remove('sort__button--active');
    this.element.querySelector('.sort-type-rating').classList.add('sort__button--active');
  };

  #sortByDefaultHandler = () => {
    this.#onSortByDefaultClick();

    this.element.querySelector('.sort-type-date').classList.remove('sort__button--active');
    this.element.querySelector('.sort-type-default').classList.add('sort__button--active');
    this.element.querySelector('.sort-type-rating').classList.remove('sort__button--active');
  };

  _restoreHandlers = () => {
    this.element.querySelector('.sort-type-date').addEventListener('click', this.#sortByDataHandler);
    this.element.querySelector('.sort-type-rating').addEventListener('click', this.#sortByRatingHandler);
    this.element.querySelector('.sort-type-default').addEventListener('click', this.#sortByDefaultHandler);
  };
}
