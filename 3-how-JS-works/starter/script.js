///////////////////////////////////////
// Lecture: Hoisting


// calculateAge(2000);

// function calculateAge(year){
//     console.log(2020-year);
// }

// var retirement = function(year){
//     console.log(65-(2020-year));
// }
// retirement(1995);


// console.log(age);
// var age = 23;
// console.log(age);

// function foo(){
//     console.log(age);
//     var age = 65;
//     console.log(age);
// }
// foo();
// console.log(age);


// calculateAge(1995);
// function calculateAge(year){
//     console.log(2020-year);
//     console.log(this);
// }

var john = {
    name:john,
    yearOfBirth:1995,
    calculateAge: function(){
        console.log(this);
        console.log(2020-this.yearOfBirth);

        function innerFunction(){
            console.log(this);
        }
        // window object will call innerFunction, not john object!!
        // so this keyword refer to window object.
        innerFunction();
    }
};

//this keyword is refer to an object which called the method
john.calculateAge();

var mike = {
    name:"Mike",
    yearOfBirth:1984
};

//assign the var calculateAge to mike object
//so we can call calculateAge function
mike.calculateAge = john.calculateAge;
mike.calculateAge();













///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword









