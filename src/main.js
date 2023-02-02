import UserProfileView from './view/user-profile-view.js';
import { render } from './framework/render.js';
import { mockComments, mockFilms } from './mock/film.js';
import MainPresente from './presenter/main-presenter.js';
import FilterModel from './model/filter-model.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';

const siteHeader = document.querySelector('.header');
const siteMain = document.querySelector('.main');

const filmsModel = new FilmsModel({
  films: mockFilms,
  comments: mockComments
});

const commentsModel = new CommentsModel({
  comments: mockComments
});

const filterModel = new FilterModel();

const filmsPresenter = new MainPresente({
  filmsContainer: siteMain,
  filmsModel,
  commentsModel,
  filterModel
});


render(new UserProfileView(), siteHeader);

filmsPresenter.init();
