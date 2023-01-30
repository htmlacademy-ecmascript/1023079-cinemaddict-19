export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export const getRandomFilms = (filmsArray, filmsAmount) => {
  const getRandomFilm = () => getRandomArrayElement(filmsArray);
  const films = Array.from({length: filmsAmount}, getRandomFilm);

  return films;
};

export const isEnterPush = (evt) => evt.key === 'Enter';
export const isEscapePush = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

