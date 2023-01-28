import { render } from '../framework/render.js';
import { remove } from '../framework/render.js';
import FilterView from '../view/sort-and-filter-view.js';
import FilmContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import UserProfileView from '../view/user-profile-view.js';
import LoadingPageView from '../view/loading-page-view';
import FilmPresenter from './film-presenter.js';
import { SortType } from '../framework/render.js';

const FILMS_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #mainContainer;
  #headerContainer;
  #bodyContainer;
  #filmsModel;
  #commentModel;
  #filterComponent;
  #films;
  #showMoreButton;
  #filmContainerView = new FilmContainerView();
  #filmListContainer = this.#filmContainerView.filmListContainer;
  #filmPresenters = [];
  #currentSortType = SortType.DEFAULT;

  #renderedFilmsCount = 0;
  /** @type {FilmPresenter | null} */
  #openedFilmPresenter = null;

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
    this.#renderFilter();
    this.#renderFilmContainer();

    if (!this.#filmsModel.films.length) {
      this.#renderLoading();
    } else {
      this.#renderUserProfile();
      this.#renderCards(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);

      if (this.#renderedFilmsCount < this.films.length) {
        this.#renderShowMoreButton();
      }
    }
  }

  get films() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmsModel.films].sort((a,b) => b.date - a.date);
      case SortType.RATING:
        return [...this.#filmsModel.films].sort((a,b) => b.rating - a.rating);
      case SortType.DEFAULT:
        return this.#filmsModel.films;
    }

    return this.#filmsModel.films;
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
    this.#filterComponent = new FilterView(this.#onSortByDateClick, this.#onSortByRatingClick, this.#onSortByDefaultClick);
    render(this.#filterComponent, this.#mainContainer);
  };

  #renderCard = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListContainer, this.#bodyContainer, this.#onPopupOpen, this.#onPopupClose);
    filmPresenter.init(film, this.#commentModel.comments);

    this.#filmPresenters.push(filmPresenter);
  };

  #renderCards = (from, to) => {
    this.films.slice(from, to).forEach((film) => {
      this.#renderCard(film, this.#filmListContainer);
      this.#renderedFilmsCount++;
    });
  };

  #renderShowMoreButton = () => {
    this.#showMoreButton = new ShowMoreButtonView(this.#onShowMoreButtonClick);
    render(this.#showMoreButton, this.#mainContainer);
  };

  #clearFilmList = () => {
    this.#filmPresenters.forEach((filmPresenter) => filmPresenter.destroy());
  };

  /**
   * @param {FilmPresenter} filmPresenter
   */
  #onPopupOpen = (filmPresenter) => {
    if (this.#openedFilmPresenter === filmPresenter) {
      return;
    }

    if (this.#openedFilmPresenter) {
      this.#openedFilmPresenter.closePopup();
    }
    this.#openedFilmPresenter = filmPresenter;
  };

  #onPopupClose = () => {
    this.#openedFilmPresenter = null;
  };

  #onShowMoreButtonClick = () => {
    this.#renderCards(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP);

    if (this.#renderedFilmsCount === this.films.length) {
      remove(this.#showMoreButton);
    }
  };

  #onSortByDateClick = () => {
    if (this.#currentSortType === SortType.DATE) {
      return;
    }
    this.#currentSortType = SortType.DATE;
    this.#clearFilmList();
    const renderedFilmsCount = this.#renderedFilmsCount;
    this.#renderedFilmsCount = 0;
    this.#renderCards(this.#renderedFilmsCount, renderedFilmsCount);

    if(!this.#mainContainer.contains(this.#showMoreButton.element) && this.#renderedFilmsCount !== this.#films.length) {
      this.#renderShowMoreButton();
    }
  };

  #onSortByRatingClick = () => {
    if (this.#currentSortType === SortType.RATING) {
      return;
    }
    this.#currentSortType = SortType.RATING;
    this.#clearFilmList();
    const renderedFilmsCount = this.#renderedFilmsCount;
    this.#renderedFilmsCount = 0;
    this.#renderCards(this.#renderedFilmsCount, renderedFilmsCount);

    if(!this.#mainContainer.contains(this.#showMoreButton.element) && this.#renderedFilmsCount !== this.#films.length) {
      this.#renderShowMoreButton();
    }
  };

  #onSortByDefaultClick = () => {
    if (this.#currentSortType === SortType.DEFAULT) {
      return;
    }
    this.#currentSortType = SortType.DEFAULT;
    this.#clearFilmList();
    const renderedFilmsCount = this.#renderedFilmsCount;
    this.#renderedFilmsCount = 0;
    this.#renderCards(this.#renderedFilmsCount, renderedFilmsCount);

    if(!this.#mainContainer.contains(this.#showMoreButton.element) && this.#renderedFilmsCount !== this.#films.length) {
      this.#renderShowMoreButton();
    }
  };
}
