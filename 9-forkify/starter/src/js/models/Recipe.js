import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }
        catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }
    calcTime() {
        //Assuming we need 15 mins for each ingerdients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
    calcServings() {
        this.servings = 4;
    }
    perseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g']
        //map function is use to return the brand new array and each element will be from the callback function
        const newIngredients = this.ingredients.map((el) => {
            //1) Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, index) => {
                ingredient = ingredient.replace(unit, units[index]);
            });

            //2)Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, "");

            //3) Parse ingredients into count, unit
            const arrIng = ingredient.split(' ');
            //el2 is the for each element in arrIng
            //We use findIndex to find the index of element in unitShorts
            //indexOf -> use callback function and return the index which the callback function return true
            //find the index which in arrIng which that is the unit
            const unitIndex = arrIng.findIndex((el2) => {
                return units.includes(el2);
            });

            let objIng;
            if (unitIndex > -1) {
                //There is a unit
                //Ex. 4 1/2 cups, arrCount = [4,1/2] --> "4+1/2"
                //Ex. 4 cups, arrCount = [4]
                //eval function is to calculate the string in the expression ex. eval("4+1/2") = 4.5
                let count;
                const arrCount = arrIng.slice(0, unitIndex);
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                objIng = {
                    count: count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
            }
            else if (parseInt(arrIng[0], 10)) {
                //There is no unit but the first element is number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    //join method is use for make the array to string and we can pass argument
                    //which will represent to seperating for each element in string
                    ingredient: arrIng.slice(1).join(' ')
                };

            }
            else if (unitIndex === -1) {
                //There is no unit and no number in first position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient: ingredient
                    //we can also write ingredient in ES6
                };
            }

            return objIng;
        });
        this.ingredients = newIngredients;
    }
    updateServings(type) {
        //Servings
        const newServings = type === 'dec'? this.servings-1:this.servings+1;
        //Ingerdients
        this.ingredients.forEach((current)=>{
            current.count *= (newServings/this.servings);
        });
        
        this.servings = newServings;
    }
}