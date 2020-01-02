// // Lecrure: let and const

// //ES5
// var name5 = 'Jane Smith';
// var age5 = 23;
// name5 = 'Jane Miller';
// console.log(name5);

// //ES6
// const name6 = 'Jane Smith';
// let age6 = 23;
// // name6 = 'Jane Miller';
// // console.log(name6);

// //ES5
// function driverLicense5(passedTest) {
//     if (passedTest) {
//         //We can log the var before it exist (we get undefined)
//         console.log(firstName);
//         var firstName = 'John';
//         var yearOfBirth = 1990;
//     }
//     //Function scope
//     console.log(firstName);
//     console.log(yearOfBirth);
// }
// driverLicense5(true);


// //ES6
// function driverLicense6(passedTest) {
//     if (passedTest) {
//         //We cannot log the let before we declare it (we get an error)
//         //console.log(firstName);
//         let firstName = 'John';
//         const yearOfBirth = 1990;
//         //Block scope
//         //let and const are only valid on its own block
//         console.log(firstName);
//         console.log(yearOfBirth);
//     }

// }
// driverLicense6(true);

// let i = 23;
// for(let i =0;i<5;i++){
//     console.log(i);
// }
// //This is the i from line 46
// console.log(i);


// var j = 23;
// for(var j =0;j<5;j++){
//     console.log(j);
// }
// console.log(j);




// ////////////////////////////////
// //Lecture: Blocks and IIFEs

// //ES6
// {
//     const a = 1;
//     let b = 2;
//     var c = 3;
// }
// //a and b are not accessible from outside the block
// //console.log(a+b);
// console.log(c);

// //ES5
// (function () {
//     var c = 3;
// })();
// //Function scope
// //console.log(c);




// ////////////////////////////////
// //Lecture: Strings
// let firstName = 'John';
// let lastName = 'Smith';
// const yearOfBirth = 1990;
// function calcAge(year) {
//     return 2020 - year;
// }

// //ES5
// console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today he is ' + calcAge(yearOfBirth) + '.');

// //ES6
// //template literals
// console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)}.`);


// //Strings method
// const n = `${firstName} ${lastName}`;
// console.log(n.startsWith('J'));
// console.log(n.endsWith('th'));
// console.log(n.includes(' '));
// console.log(`${firstName} `.repeat(5));






// ////////////////////////////////
// //Lectrure: Arrow function
// const year = [2000, 1990, 1985, 2005, 1982];

// //ES5
// var ages5 = year.map(function (current) {
//     return 2020 - current;
// });
// console.log(ages5);

// //ES6
// //Argument , arrow, return statement without return keyword;
// let ages6 = year.map(current => 2020 - current);
// console.log(ages6);

// //When we have two argument, we use the parenteses
// ages6 = year.map((el, index) => `Age element ${index + 1}: ${2020 - el}`);
// console.log(ages6);

// //When we want more than one line of code
// ages6 = year.map((el, index) => {
//     const now = new Date().getFullYear();
//     const age = now - el;
//     return `Age element ${index + 1}: ${age}.`;
// });
// console.log(ages6);





// ////////////////////////////////
// //Lecture: Arrow functions 2

// //ES5
// var box5 = {
//     color: 'green',
//     position: 1,
//     clickMe: function () {
//         //This keyword will point to the object that we are working.
//         var self = this;
//         document.querySelector('.green').addEventListener('click', function () {
//             var str = 'This box number ' + self.position + ' and it is ' + self.color;
//             console.log(str);
//         });
//     }
// };
// // box5.clickMe();

// //ES6
// var box6 = {
//     color: 'green',
//     position: 1,
//     clickMe: function () {
//         //When we use arrow function, it will use the this keyword from surrounding (same as clickme method)
//         //So this keyword refer to box6 object
//         document.querySelector('.green').addEventListener('click', () => {
//             const str = 'This box number ' + this.position + ' and it is ' + this.color;
//             console.log(str);
//         });
//     }
// };
// //box6.clickMe();

// // var box66 = {
// //     color: 'green',
// //     position: 1,
// //     //The clickme method will use the this keyword from global (window)
// //     //So, the window does not have position and color
// //     //That's whay it's undefined
// //     //Be careful about it!!
// //     clickMe: () => {
// //         document.querySelector('.green').addEventListener('click', () => {
// //             const str = 'This box number ' + this.position + ' and it is ' + this.color;
// //             console.log(str);
// //         });
// //     }
// // };
// // box66.clickMe();





// var friends = ['Bob', 'Jane', 'Smith'];
// var john = new Person('John');

// // ES5
// function Person(name) {
//     this.name = name;
// }
// Person.prototype.myFriends5 = function (friends) {
//     var self = this;

//     var arr = friends.map(function (current) {
//         //this keyword will refer to annonymous function
//         //this keyword refer to global object (window)
//         return self.name + ' is friend with ' + current;
//     });
//     console.log(arr);

//     //Another solution (use bind function)
//     var arr2 = friends.map(function (current) {
//         return this.name + ' is friend with ' + current;
//     }.bind(this));

//     console.log("Another solution (use bind function()) " + arr2);
// }


// //ES6
// Person.prototype.myFriends6 = function (friends) {
//     var arr = friends.map((current) => {
//         //We share this same this keyword
//         return `${this.name} is friend with ${current}`;
//     });
//     console.log(arr);
// }
// john.myFriends5(friends);

// var mike = new Person('Mike');
// mike.myFriends6(friends);






// ////////////////////////////////
// //Lecture: Destructing

// //ES5
// var john = ['John', 26];
// // var name = john[0];
// // var age = john[1];


// //ES6
// //Destruct tht array
// //Create the constant call name and year
// const [name, age] = ['John', 26];
// console.log(name);
// console.log(age);

// const obj = {
//     firstName: 'John',
//     lastName: 'Smith'
// };

// //The name have to match the key!!
// const { firstName, lastName } = obj;
// console.log(firstName);
// console.log(lastName);

// //If we do not want to have the same name of var
// const { firstName: a, lastName: b } = obj;
// console.log(a);
// console.log(b);


// function calcAgeRetirement(year) {
//     const now = new Date().getFullYear();
//     const age = now - year;
//     return [age, 65 - age];
// }


// const [age2, retirement] = calcAgeRetirement(1990);
// console.log(age2);
// console.log(retirement);






// ////////////////////////////////
// //Lecture: Arrays

// const boxes = document.querySelectorAll('.box');

// // //ES5
// // var boxesArray5 = Array.prototype.slice.call(boxes);
// // boxesArray5.forEach(function (current) {
// //     current.style.backgroundColor = 'dodgerblue';
// // });

// //ES6
// var boxesArray6 = Array.from(boxes);
// boxesArray6.forEach((current) => {
//     current.style.backgroundColor = 'dodgerblue';
// });

// // //ES5
// // for (var i = 0; i < boxesArray5.length; i++) {
// //     if (boxesArray5[i].className === 'box blue') {
// //         continue;
// //     }
// //     boxesArray5[i].textContent = 'I\'m blue';
// // }

// //ES6 for off
// for (const current of boxesArray6) {
//     if (current.className.includes('blue')) {
//         continue;
//     }
//     current.textContent = 'I change to blue';
// }


// //ES5
// var ages = [12, 20, 19, 11, 13, 14];
// var fullAge = ages.map(function (current) {
//     return current >= 18;
// });
// console.log(fullAge);
// console.log(fullAge.indexOf(true));
// console.log(ages[fullAge.indexOf(true)]);

// //ES6
// //if we have more tha one line of code, we have to use {} and add keyword return for arrow functions

// //findIndex() use to find index which statify the condition that we create
// console.log(ages.findIndex(current => current >= 18));

// //find() use to find the value whoch statify condition that we create
// console.log(ages.find(current => current >= 18));





// ////////////////////////////////
// //Lecture: Spread operator
// function addFourAges(a, b, c, d) {
//     return a + b + c + d;
// }
// var sum1 = addFourAges(11, 14, 10, 12, 13);
// console.log(sum1);

// //Pass an array to functiom
// //ES5
// var ages = [11, 14, 10, 12, 13];
// //Pass the ages array into the function as argument
// var sum2 = addFourAges.apply(null, ages);
// console.log(sum2);

// //ES6
// //Spread the array to the var  
// const sum3 = addFourAges(...ages);
// console.log(sum3);

// const familySmith = ['John', 'jane', 'Mark'];
// const familyMiller = ['Marry', 'Bob', 'Ann'];
// //We spread for each elemtn in the array and then we use , to combine it!!
// const bigFamily = [...familySmith, 'Lilly', ...familyMiller];
// console.log(bigFamily);


// //boxes is nodeList
// const h = document.querySelector('h1');
// const boxes = document.querySelectorAll('.box');
// var all = [h, ...boxes];
// Array.from(all).forEach((current) => {
//     current.style.color = 'purple';
// });






////////////////////////////////
//Lecture: Rest Parameters
//Rest parameter is the opposite of spread operator

// //ES5
// function isFullAge5(){
//     //The argument looks like Array, but it's not (it's object)
//     //console.log(arguments);
//     var argsArray = Array.prototype.slice.call(arguments);
//     argsArray.forEach(function(current){
//         console.log((2020-current) >= 18);
//     });
// }

// // isFullAge5(1990,1999,2010);
// // isFullAge5(2000,2008,1990,2004);

// //ES6
// //years will be the Array
// function isFullAge6(...years){
//     years.forEach((current) => {
//         console.log((2020-current)>=18);
//     });
// }
// isFullAge6(2000,2008,1990,2004);



// //ES5
// function isFullAge5(limit) {
//     //The argument looks like Array, but it's not (it's object)
//     //console.log(arguments);
//     //We can pass second argument to represent the start index that we want to slice the Array
//     var argsArray = Array.prototype.slice.call(arguments, 1);
//     console.log(argsArray);
//     argsArray.forEach(function (current) {
//         console.log((2020 - current) >= limit);
//     });
// }

// // isFullAge5(21, 1990, 1980, 2010);
// // isFullAge5(2000,2008,1990,2004);

// //ES6
// //years will be the Array
// function isFullAge6(limit, ...years) {
//     years.forEach((current) => {
//         console.log((2020 - current) >= limit);
//     });
// }
// isFullAge6(16, 2000, 2008, 1990, 1990);


// //////////////////////////////
// Lecture: Default parameters

// ES5
// function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
//     lastName === undefined ? lastName = 'Smith':lastName = lastName; 
//     nationality === undefined ? nationality = 'america': nationality = nationality;
//     this.firstName = firstName;
//     this.yearOfBirth = yearOfBirth;
//     this.lastName = lastName;
//     this.nationality = nationality;
// }

// //We can pass only few argument, the rest will be undefined
// var john = new SmithPerson('John', 1990);
// console.log(john);
// var emily = new SmithPerson('emily',1980,'Diaz','Spanish');
// console.log(emily);

// ES6
// function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'America') {
//     this.firstName = firstName;
//     this.yearOfBirth = yearOfBirth;
//     this.lastName = lastName;
//     this.nationality = nationality;
// }

// var john = new SmithPerson('John', 1990);
// console.log(john);
// var emily = new SmithPerson('emily',1980,'Diaz','Spanish');
// console.log(emily);





// //////////////////////////////
// //Lecture: Maps

// const question = new Map();
// //key, value
// question.set('question', 'What is official name of the latest major Javascript version?');
// question.set(1, 'ES5');
// question.set(2, 'ES6');
// question.set(3, 'ES2015');
// question.set(4, 'ES7');
// question.set('correct', 3);
// question.set(true, 'Correct answer.');
// question.set(false, 'Wrong, please try again.');
// // console.log(question);

// console.log(question.get('question'));
// // console.log(question.size);

// if (question.has(4)) {
//     // console.log('Answer 4 is here!');
//     // question.delete(4);
// }
// // console.log(question);

// // question.clear();
// // console.log(question);
// // question.forEach((value, key) => console.log(`This is ${key} and it's set to ${value}`));
// // console.log('----------------');
// for (let [key, value] of question.entries()) {
//     if (typeof (key) === 'number') {
//         console.log(`This is ${key} and it's set to ${value}`);
//     }
// }

// const ans = parseInt(prompt('Write the correct answer'));
// console.log(question.get(ans === question.get('correct')));




// //////////////////////////////
// //Lecture: Classes


// //ES5
// var Person5 = function (name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// };
// Person5.prototype.calcAge = function () {
//     var age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age);
// }

// var john5 = new Person5('John', 1990, 'Teacher');
// console.log(john5);
// john5.calcAge();


// //ES6
// class Person6 {
//     constructor(name, yearOfBirth, job) {
//         this.name = name;
//         this.yearOfBirth = yearOfBirth;
//         this.job = job;
//     }
//     calcAge(){
//         const age = new Date().getFullYear() - this.yearOfBirth;
//         console.log(age);
//     }
//     static greeting(){
//         console.log('Hey, there');
//     }
// }

// const john6 = new Person6('john',1990,'Teacher');
// console.log(john6);
// john6.calcAge();
// Person6.greeting();






//////////////////////////////
//Lecture classes and subclasses
var Person5 = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};
Person5.prototype.calcAge = function () {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var Athlete5 = function (name, yearOfBirth, job, olympicGames, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olympicGames = olympicGames;
    this.medals = medals;
}

Athlete5.prototype = Object.create(Person5.prototype);

var johnAthlete5 = new Athlete5('john',1990,'Teacher',);