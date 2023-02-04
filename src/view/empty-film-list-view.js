import AbstractView from '../framework/view/abstract-view.js';
import { createEmptyFilmListTemplate } from './empty-film-list-view.template.js';

export default class EmptyFilmListView extends AbstractView {
  #filters = null;
  #activeFilter = null;

  constructor({filters, activeFilter}) {
    super();
    this.#filters = filters;
    this.#activeFilter = activeFilter;
  }

  get template() {
    return createEmptyFilmListTemplate(this.#filters, this.#activeFilter);
  }

}
