import FilmPresenter from './presenter/presenter.js';
import FilmsModel from './model/films-model.js';

const mainContainer = document.querySelector('.main');
const header = document.querySelector('.header');
const body = document.querySelector('body');

const filmsModel = new FilmsModel;
const films = filmsModel.getFilms();

const presenter = new FilmPresenter(mainContainer, header, body, films);

presenter.init();
