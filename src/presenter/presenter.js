import { render } from '../render.js';
import FilterView from '../view/sort-and-filter-view.js';
import FilmContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import UserProfileView from '../view/user-profile-view.js';
import PopupView from '../view/popup-view.js';


export default class FilmPresenter {

  constructor(mainContainer, headerContainer, bodyContainer, films) {
    this.container = mainContainer;
    this.header = headerContainer;
    this.body = bodyContainer;
    this.films = films;
  }

  init() {
    const filmListContainer = new FilmContainerView();

    render(new UserProfileView(), this.header);
    render(new FilterView(), this.container);
    render(filmListContainer, this.container);

    for(let i = 0; i < this.films.length; i++) {
      render(new FilmCardView(this.films[i]), filmListContainer.getFilmListContainer());
    }
    render(new ShowMoreButtonView(), this.container);
    // render(new PopupView(), this.body);
  }
}
