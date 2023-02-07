export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_FILM',
  DELETE_COMMENT: 'DELETE_FILM',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT'
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITE: 'favorites',
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const COMMENTS_EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry'
];

export const DateFormat = {
  FILM_CARD: 'YYYY',
  FILM_POPUP: 'D MMM YYYY'
};

export const UserRank = {
  NOVICE: 'novice',
  FAN: 'fan',
  MOVIE_BUFF: 'movie buff'
};

export const UserRankLimit = {
  NOVICE: 10,
  FAN: 20
};

export const DEFAULT_USER_RATING = 0;

export const FILM_DESCRIPTION_LIMIT = 139;
