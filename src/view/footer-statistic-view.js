import { createStatisticTemplate } from './footer-statistic-view.template';
import AbstractView from '../framework/view/abstract-view.js';

export default class FooterStatisticsView extends AbstractView {
  #filmsQuantity = null;

  constructor({filmsQuantity}) {
    super();
    this.#filmsQuantity = filmsQuantity;
  }

  get template() {
    return createStatisticTemplate(this.#filmsQuantity);
  }
}
