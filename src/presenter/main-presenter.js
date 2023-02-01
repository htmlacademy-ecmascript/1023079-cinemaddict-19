import { render, remove } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import FilmContainerView from '../view/films-container-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import UserProfileView from '../view/user-profile-view.js';
import LoadingPageView from '../view/loading-page-view';
import FilmPresenter from './film-presenter.js';
import { SortType } from '../framework/render.js';
import {UpdateType, UserAction, FilterType} from '../consts.js';
import {filter} from '../utils/filter.js';


const FILMS_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #mainContainer;
  #headerContainer;
  #filmsModel;
  #commentsModel;
  #sortComponent;
  #showMoreButton;
  #filmContainerView = new FilmContainerView();
  #userProfile = new UserProfileView();
  #filmListContainer = this.#filmContainerView.filmListContainer;
  #filmPresenters = [];
  #currentSortType = SortType.DEFAULT;
  #filterModel;
  #filterType = FilterType.ALL;
  #noFilmComponent;

  #renderedFilmsCount = 0;

  constructor(
    mainContainer,
    headerContainer,
    bodyContainer,
    filmsModel,
    commentsModel,
    filterModel
  ) {
    this.#mainContainer = mainContainer;
    this.#headerContainer = headerContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;
    this.#sortComponent = new SortView(this.#handleSortTypeChange);
    this.#showMoreButton = new ShowMoreButtonView(this.#onShowMoreButtonClick);

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderFilmContainer();
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort((a,b) => b.date - a.date);
      case SortType.RATING:
        return filteredFilms.sort((a,b) => b.rating - a.rating);
      case SortType.DEFAULT:
        return films;
      default:
        throw new Error('adawdad');
    }
  }

  get comments() {
    return this.#commentsModel.comments;
  }

  #renderFilmContainer = () => {
    this.#renderUserProfile();
    this.#renderSort();
    render(this.#filmContainerView, this.#mainContainer);

    if (!this.films.length) {
      this.#renderLoading();
    } else {
      this.#renderCards(this.films.slice(0, FILMS_COUNT_PER_STEP));
      this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

      if (this.#renderedFilmsCount < this.films.length) {
        this.#renderShowMoreButton();
      }
    }
  };

  #clearFilmContainer({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this.films.length;

    this.#clearFilms();

    remove(this.#sortComponent);
    remove(this.#showMoreButton);

    if (resetRenderedFilmCount) {
      this.#renderedFilmsCount = 0;
    } else {
      this.#renderedFilmsCount = Math.min(filmCount, this.#renderedFilmsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #renderLoading = () => {
    this.#noFilmComponent = new LoadingPageView({
      filterType: this.#filterType
    });

    render(this.#noFilmComponent, this.#filmListContainer);
  };

  #renderUserProfile = () => {
    render(this.#userProfile, this.#headerContainer);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainContainer);
  };

  #renderCard = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListContainer, this.#handleViewAction, this.#handleModeChange, this.#filterModel.filter, this.#commentsModel);
    filmPresenter.init(film, this.comments);

    this.#filmPresenters.push(filmPresenter);
  };

  #renderCards = (films) => {
    films.forEach((film) => this.#renderCard(film));
  };

  #renderShowMoreButton = () => {
    render(this.#showMoreButton, this.#mainContainer);
    this.#showMoreButton._restoreHandlers();
  };


  #clearFilms({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this.films.length;

    this.#filmPresenters.forEach((presenter) => presenter.destroy());
    this.#filmPresenters.clear();

    remove(this.#sortComponent);

    if (resetRenderedFilmCount) {
      this.#renderedFilmsCount = FILMS_COUNT_PER_STEP;
    } else {
      this.#renderedFilmsCount = Math.min(filmCount, this.#renderedFilmsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #onShowMoreButtonClick = () => {
    this.#renderCards(this.films.slice(this.#renderedFilmsCount, this.#renderedFilmsCount + FILMS_COUNT_PER_STEP));
    this.#renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmsCount >= this.films.length) {
      remove(this.#showMoreButton);
    }
  };

  #handleModeChange = () => {
    this.#filmPresenters.forEach((presenter) => presenter.reset());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(updateType, update);
        break;
      default:
        throw new Error(`Unknown state!, ${actionType}`);
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearFilmContainer();
        this.#renderFilmContainer();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmContainer({resetRenderedTaskCount: true, resetSortType: true});
        this.#renderFilmContainer();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilms({resetRenderedFilmCount: true});
    this.#renderFilmContainer();
  };
}
