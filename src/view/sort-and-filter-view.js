import AbsractView from '../framework/view/abstract-view.js';
import { createFilterTemplate } from './sort-and-filter.template.js';

export default class FilterView extends AbsractView {

  get template() {
    return createFilterTemplate();
  }
}
