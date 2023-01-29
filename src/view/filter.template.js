function createFilterItemTemplate(filter, currentFilterType) {
  const {type, name, count} = filter;
  return (
    `<a href="#${type}" class="main-navigation__item
     ${type === currentFilterType ? 'main-navigation__item--active' : ''}"
     data-filter = "${type}"
     >
      ${name}
      ${type === 'all' ? '' :
      `<span class="main-navigation__item-count">${count}</span>`}
     </a>`
  );
}

export function createFiltersTemplate(filterItems, currentFilterType) {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<nav class="main-navigation">
      ${filterItemsTemplate}
    </nav>
    `
  );
}
