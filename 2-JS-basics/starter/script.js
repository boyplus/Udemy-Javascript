console.log("Hello world!");
var boy = {
    name:"Thanaphon",
    surname:"Sombunkaeo",
    birthYear:2000,
    calAge: function(){
        return 2020-this.birthYear;
    }
};

boy.age = boy.calAge();
console.log(boy.age);