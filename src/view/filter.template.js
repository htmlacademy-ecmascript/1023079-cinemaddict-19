import { FilterType } from '../consts.js';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, filteredFilms} = filter;
  return (
    `
    <a href="#${type}" data-filter-type="${type}"
    class="main-navigation__item ${type === currentFilterType ? 'main-navigation__item--active' : ''}">
      ${name}
      <span class="main-navigation__item-count">${filteredFilms.length}</span>
    </a>
    `
  );
};

export const createFiltersTemplate = (filters, currentFilterType) => (
  `<nav class="main-navigation">
      <a href="#all" data-filter-type="${FilterType.ALL}"
      class="main-navigation__item ${currentFilterType === FilterType.ALL ? 'main-navigation__item--active' : ''}">
        All movies
      </a>
      ${Object.keys(filters).slice(1).map((filter) => `
        ${createFilterItemTemplate(filters[filter], currentFilterType)}
      `).join('')}
   </nav>`
);
