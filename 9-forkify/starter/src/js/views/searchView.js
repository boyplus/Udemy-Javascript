import { elements } from './base';
export const getInput = () => {
    return elements.searchInput.value;
};
export const clearInput = () => {
    elements.searchInput.value = '';
};
export const clearResult = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResultPages.innerHTML = '';
};
export const hilightSelected = (id) => {
    const resultArray = Array.from(document.querySelectorAll('.results__link'));
    resultArray.forEach((current)=>{
        current.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};

//private function (do not have to export it)
/*
Pasta with tomato and spinach
acc:0  acc + current.length = 0+5 = 5
acc:5  acc + current.length = 5+4 = 9
acc:9  acc + current.length = 9+6 = 15
acc:15 acc + current.length = 15+3 = 18 -> not include in array
*/
export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    //acc = all past length, si the first iteration acc = 0
    if (title.length > limit) {
        title.split(' ').reduce((acc, current) => {
            if (acc + current.length <= limit) {
                newTitle.push(current);
            }
            return acc + current.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
};

const renderRecipe = (recipe) => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

//type: previous, next
//page is current page
const createButton = (page, type) => {
    //data-togo is data attribute
    const markup = `
        <button class="btn-inline results__btn--${type}" data-goto = ${type === 'prev' ? page - 1 : page + 1}>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        </button>
    `;
    return markup;
};

const renderButtons = (page, numResult, resultPerpage) => {
    const pages = Math.ceil(numResult / resultPerpage);
    let button;
    if (page === 1 && pages > 1) {
        //Only button to the next page
        button = createButton(page, 'next');
    }
    else if (page < pages) {
        //Next page and previous page
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }
    else if (page === pages && pages > 1) {
        //Only button to previous page
        button = createButton(page, 'prev');
    }
    elements.searchResultPages.insertAdjacentHTML('afterbegin', button);
}
export const renderResults = (recipes, page = 1, resultPerpage = 10) => {
    const start = (page - 1) * resultPerpage;
    const end = page * resultPerpage;
    recipes.slice(start, end).forEach(renderRecipe);

    renderButtons(page, recipes.length, resultPerpage);
};