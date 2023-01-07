import { render } from '../framework/render.js';
import { remove } from '../framework/render.js';
import FilterView from '../view/sort-and-filter-view.js';
import FilmContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmCardView from '../view/film-card-view.js';
import UserProfileView from '../view/user-profile-view.js';
import PopupView from '../view/popup-view.js';
import LoadingPageView from '../view/loading-page-view';

const FILMS_COUNT_PER_STEP = 5;

export default class FilmPresenter {
  #mainContainer;
  #headerContainer;
  #bodyContainer;
  #filmsModel;
  #commentModel;
  #films;
  #comments;
  #showMoreButton;
  #popup;
  #filmContainerView = new FilmContainerView();
  #filmListContainer = this.#filmContainerView.filmListContainer;

  #renderedFilmsCount = 0;

  constructor(
    mainContainer,
    headerContainer,
    bodyContainer,
    filmsModel,
    commentsModel
  ) {
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;
    this.#bodyContainer = bodyContainer;
    this.#filmsModel = filmsModel;
    this.#commentModel = commentsModel;
  }

  init() {
    this.#films = this.#filmsModel.films;
    this.#comments = this.#commentModel.comments;

    this.#renderFilter();
    this.#renderFilmContainer();

    if (!this.#films.length) {
      this.#renderLoading();
    }
    else
    {
      this.#renderUserProfile();
      this.#renderCards(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);

      if(this.#renderedFilmsCount < this.#films.length) {
        this.#showMoreButton = new ShowMoreButtonView(this.#onShowMoreButtonClick);
        render(this.#showMoreButton, this.#mainContainer);
      }
    }
  }

  #renderFilmContainer = () => {
    render(this.#filmContainerView, this.#mainContainer);
  };

  #renderLoading = () => {
    render(new LoadingPageView(), this.#filmListContainer);
  };

  #renderUserProfile = () => {
    render(new UserProfileView(), this.#headerContainer);
  };

  #renderFilter = () => {
    render(new FilterView(), this.#mainContainer);
  };

  #renderCard = (film, container) => {
    film.commentsCount = this.#comments.filter(
      (comment) => comment.id === film.id
    ).length;
    const filmCard = new FilmCardView(film, this.#onCardClick);

    render(filmCard, container);
  };

  #renderCards = (from, to) => {
    this.#films.slice(from, to).forEach((film) => {
      this.#renderCard(film, this.#filmListContainer);
      this.#renderedFilmsCount++;
    });
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#popup.element.remove();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #onCloseButtonClick = () => {
    this.#popup.element.remove();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #onCardClick = () => {
    const commentsForPopup = this.#comments.slice(0, 5);
    this.#popup = new PopupView(commentsForPopup, this.#onCloseButtonClick);

    render(this.#popup, this.#bodyContainer);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #onShowMoreButtonClick = () => {
    this.#renderCards(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);

    if(this.#renderedFilmsCount === this.#films.length) {
      remove(this.#showMoreButton);
    }
  };
}
