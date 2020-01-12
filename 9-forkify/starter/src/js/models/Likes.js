export default class Likes {
    constructor() {
        this.likes = [];
    }
    addLike(id, title, author, img) {
        const like = {
            id: id,
            title: title,
            author: author,
            img: img
        };
        this.likes.push(like);

        //Persist the data in local storage
        this.persisdata();

        return like;
    }
    deleteLike(id) {
        const index = this.likes.findIndex((el) => {
            return el.id == id;
        });
        this.likes.splice(index, 1);
        this.persisdata();
    }
    isLiked(id) {
        const index = this.likes.findIndex((el) => {
            return el.id === id;
        });
        if (index === -1) return false;
        return true;
    }
    getNumberLikes() {
        return this.likes.length;
    }

    persisdata() {
        //JSON.stringify will change that array of object to be the string
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        //JSON.parse will change (deconstructing) the string to array of object (old data)
        const storage = JSON.parse(localStorage.getItem('likes'));

        //Restore likes from  the local storage
        if (storage) {
            this.likes = storage;
        }
    }
}