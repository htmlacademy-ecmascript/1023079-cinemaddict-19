export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export const getRandomComments = (commentsArray, commentsAmount) => {

  const getRandomComment = () => getRandomArrayElement(commentsArray);
  const comments = Array.from({length: commentsAmount}, getRandomComment);

  comments.forEach((comment) => {
    comment.id = getRandomInt(1, 5);
  });

  return comments;
};

export const getRandomFilms = (filmsArray, filmsAmount) => {
  const getRandomFilm = () => getRandomArrayElement(filmsArray);
  const films = Array.from({length: filmsAmount}, getRandomFilm);

  return films;
};

