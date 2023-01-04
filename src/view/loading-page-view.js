import AbstractView from '../framework/view/abstract-view.js';
import { createLoadingPageTemplate } from './loading-page-view.template.js';

export default class LoadingPageView extends AbstractView {

  get template() {
    return createLoadingPageTemplate();
  }
}
