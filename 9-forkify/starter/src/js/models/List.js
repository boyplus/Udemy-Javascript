import uniqid from 'uniqid';
export default class List {
    constructor() {
        this.items = [];
    }
    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count: count,
            unit: unit,
            ingredient: ingredient
        };
        this.items.push(item);
        return item;
    }
    deleteItem(id) {
        //splice(indexStart,numberofElements)
        //[2,4,8].splice(1,1) -> returns 4, original array = [1,8] it mutate the original array
        //[2,4,8].splice(1,2) -> returns 4, original array = [2,4,8] it does not mutate the origional array
        //findIndex will return the index which the condition in callback functio  is true
        const index = this.items.findIndex((el) => {
            return el.id == id;
        });
        this.items.splice(index, 1);
    }
    updateCount(id, newCount) {
        //find method will return the element which make the condition in callback function return true
        this.items.find((el) => {
            return el.id === id;
        }).count = newCount;
    }
};