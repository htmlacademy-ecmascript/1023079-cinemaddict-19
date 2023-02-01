export const DATE_FORMAT = 'DD/MM/YYYY hh:mm';
export const COMMENT_COUNT = 49;
export const FILM_COUNT = 17;

export const Emotion = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry',
};

export const COMMENTS_EMOTIONS = [
  Emotion.SMILE,
  Emotion.SLEEPING,
  Emotion.PUKE,
  Emotion.ANGRY,
];

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites'
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};
