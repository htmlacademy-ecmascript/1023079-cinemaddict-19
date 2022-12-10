import FilmPresenter from './presenter/presenter.js';

const mainContainer = document.querySelector('.main');
const header = document.querySelector('.header');
const body = document.querySelector('body');

const presenter = new FilmPresenter(mainContainer, header, body);

presenter.init();
