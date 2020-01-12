import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

import { elements, renderLoader, clearLoader } from './views/base';

/*
Global state of the App
- Search Object
- Current recipe object
- Shopping list object
- Liked recipes
*/
const state = {};
/*
Search controller
*/
const controlSearch = async () => {
    //1.get query from the fields
    const query = searchView.getInput();
    if (query) {
        //2.New search object and add to state
        state.search = new Search(query);

        //3.Prepare UI to results
        //clear input and result from UI
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchRes);

        //4.Search for recipes
        try {
            await state.search.getResults();

            //5.render results on UI
            clearLoader();
            searchView.renderResults(state.search.results);

            //6.clear input
            searchView.clearInput();
        }
        catch (error) {
            console.log(error);
            alert('Something went wrong with the search...');
            clearLoader();
        }
    }
}
elements.serachForm.addEventListener('submit', (element) => {
    element.preventDefault();
    controlSearch();
});
elements.searchResultPages.addEventListener('click', (event) => {
    const btn = event.target.closest('.btn-inline');
    if (btn) {
        //we can also use dataset.page, if we write data-page = "2" in the HTML
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResults(state.search.results, gotoPage);
    }
});



/*
Recipe controller
*/

const controlRecipe = async () => {
    //Get ID from url
    const id = window.location.hash.replace('#', '');
    recipeView.clearRecipe();
    if (id) {

        //prepare UI for change
        renderLoader(elements.recipe);
        if (state.search) {
            searchView.hilightSelected(id);
        }

        //create new recipe object
        //we save the new Recipe int the state
        state.recipe = new Recipe(id);

        //get recipe data
        //Wait the promise to get back the value
        try {
            await state.recipe.getRecipe();
            //calculate servings and time
            state.recipe.perseIngredients();
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render recipe
            recipeView.clearRecipe();
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        }
        catch (error) {
            console.log(error);
            alert('Error processing recipe!');
        }
    }
};
['hashchange', 'load'].forEach((current) => {
    window.addEventListener(current, controlRecipe);
});



/*
LIST CONTROLLER
*/
const controlList = () => {
    //Create a new list if there is none yet
    if (!state.list) {
        //empty object
        state.list = new List();
    }

    //Add each ingredient in the list and user interface
    state.recipe.ingredients.forEach((el) => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });

}




/*
LIKE CONTROLLER
*/

const controlLike = () => {
    if (!state.likes) {
        // state.likes = new Likes();
    }
    const currentId = state.recipe.id;
    if (!state.likes.isLiked(currentId)) {
        //Do not like yet -> change to liked
        //Add like to data
        const newLike = state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );


        //Toggle the like button
        likesView.toggleLikeButton(true);

        //Add like to UI list
        likesView.renderLike(newLike);

    }
    else {
        //Already liked -> change to like
        //Remove liked from state
        state.likes.deleteLike(currentId);

        //Toggle the like button
        likesView.toggleLikeButton(false);

        //Remove like from ui list
        likesView.deleteLike(currentId);
    }
    likesView.toggleLikedMenu(state.likes.getNumberLikes());
}



//Restore like recipe when the page load
window.addEventListener('load', () => {
    state.likes = new Likes();

    //Restore likes
    state.likes.readStorage();

    //Toggle like button menu
    likesView.toggleLikedMenu(state.likes.getNumberLikes());


    //Render the exist 
    state.likes.likes.forEach((current) => {
        likesView.renderLike(current);
    });
});




//Handling recipe button click
elements.recipe.addEventListener('click', e => {
    //.btn-decrease * is any child element in .btn-decrease
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngerdients(state.recipe);
        }
    }
    else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngerdients(state.recipe);
    }
    //that element and the all child using *
    else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        //add ingredients to shopping list
        controlList();
    }
    else if (e.target.matches('.recipe__love, .recipe__love *')) {
        //Like controller
        controlLike();
    }
});


//Handle delete and update list item event
elements.shopping.addEventListener('click', (event) => {
    //closest method will return the element which cloest to that element that we pass
    //we use cloest() in case of the button has many child
    //but we want to access to the parent element (argument that we pass)
    const id = event.target.closest('.shopping__item').dataset.itemid;
    if (event.target.matches('.shopping__delete, .shopping__delete *')) {
        //delete from state
        state.list.deleteItem(id);
        //delete from UI
        listView.deleteItem(id);
    }
    else if (event.target.matches('.shopping__count-value')) {
        const val = parseFloat(event.target.value);
        if (val < 0) {
            event.target.value = 0;
        }
        state.list.updateCount(id, val);
    }
});