import { FilterType } from '../consts.js';

const NoFilmsTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITE]:'There are no favorite movies now',
};


export const createLoadingPageTemplate = (filterType) => {
  const noFilmsTextValue = NoFilmsTextType[filterType];

  return `<h2 class="films-list__title">${noFilmsTextValue}</h2>`;
};

