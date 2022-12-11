import { getRandomFilm } from '../mocks/mock.js';

const FILM_COUNT = 5;

export default class FilmsModel {
  films = Array.from({length: FILM_COUNT}, getRandomFilm);

  getFilms() {
    return this.films;
  }
}
