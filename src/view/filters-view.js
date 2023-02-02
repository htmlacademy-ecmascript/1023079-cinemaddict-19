import AbstractView from '../framework/view/abstract-view.js';
import { createFiltersTemplate } from './filter.template.js';

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    const filter = evt.target.closest('.main-navigation__item');
    if (filter && !filter.classList.contains('main-navigation__item--active')) {
      this.#handleFilterTypeChange(filter.dataset.filterType);
    }
  };
}
