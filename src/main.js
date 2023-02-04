import UserProfileView from './view/user-profile-view.js';
import { render } from './framework/render.js';
import { mockComments, mockFilms } from './mock/film.js';
import MainPresente from './presenter/main-presenter.js';
import FilterModel from './model/filter-model.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilmsApiService from './films-api.js';

const AUTHORIZATION = 'Basic SPMsk28493';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

const siteHeader = document.querySelector('.header');
const siteMain = document.querySelector('.main');

const filmsModel = new FilmsModel({
  filmsApiService: new FilmsApiService(END_POINT, AUTHORIZATION),
  mockFilms
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
