import { elements } from './base';
import {limitRecipeTitle} from './searchView';
export const toggleLikeButton = (isLiked) => {
    //icons.svg#icon-heart-outlined
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
};

export const toggleLikedMenu = (numLikes) => {
    if (numLikes > 0) {
        elements.likesMenu.style.visibility = 'visible';
    } else {
        elements.likesMenu.style.visibility = 'hidden';
    }
};

export const renderLike = (like) => {
    const markup = `
        <li>
            <a class="results__link results__link--active" href="#${like.id}">
                <figure class="results__fig">
                    <img src="${like.img}" alt="${limitRecipeTitle(like.title)}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(like.title)}</h4>
                    <p class="results__author">${like.author}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = (id) =>{
    const el = document.querySelector(`.likesList[href="#${id}"]`);
    if(el){
        el.parentElement.removeChild(el);
    }
}