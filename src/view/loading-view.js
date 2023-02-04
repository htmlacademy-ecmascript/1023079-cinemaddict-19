import { createLoadingTemplate } from './loading-view-template';
import AbstractView from '../framework/view/abstract-view.js';

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}
