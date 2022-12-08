import { render } from '../render.js';
import filterView from '../view/sort-and-filter-view.js';
import filmContainerView from '../view/films-container-view.js';
import showMoreButtonView from '../view/show-more-button-view.js';
import filmCardView from '../view/film-card-view.js';
import userProfileView from '../view/user-profile-view.js';
import popupView from '../view/popup-view.js';

const header = document.querySelector('.header');
const body = document.querySelector('body');

export default class FilmPresenter {

  constructor(container) {
    this.container = container;
  }

  init() {
    render(new userProfileView(), header);   //использовать new class или создавать константы component и обращаться к ним как к свойствам this.component?
    render(new filterView(), this.container);   //можно ли убрать скобки при создании экземпляра?
    render(new filmContainerView(), this.container);

    const filmList = document.querySelector('.films-list__container');

    for(let i = 0; i < 5; i++) {
      render(new filmCardView(), filmList);
    }
    render(new showMoreButtonView(), this.container);
    render(new popupView(), body);
  }
}

//presenter - посредник между model и view. зачем он все таки нужен?
