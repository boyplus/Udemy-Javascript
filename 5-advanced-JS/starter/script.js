///////////////////////////////////////////////////////////////////////
////Lecture: Function constructor
// var Person = function(name,yearofBirth,job){
//     this.name = name;
//     this.yearofBirth = yearofBirth;
//     this.job = job;
// };

// //inheritance the calculateAge method to Person
// Person.prototype.calculateAge = function(){
//     console.log(2020-this.yearofBirth);
// };

// //inherit the lastName attribute to Person
// Person.prototype.lastName = 'Smith';

// //Create new object from function constructor
// var john = new Person('John',1990,'Teacher');
// var jane = new Person('Jane',2000,'Designer');
// var mark = new Person('Mark',1995,'Police');
// john.calculateAge();
// jane.calculateAge();
// mark.calculateAge();
// console.log(jane.lastName);





///////////////////////////////////////////////////////////////////////
//Lecture: create object by using Object.create
//Object.create
// var personProto = {
//     calculateAge: function () {
//         console.log(2020 - this.yearofBirth);
//     }
// };

// var john = Object.create(personProto);
// john.name = 'John';
// john.yearofBirth = 1990;
// john.job = 'Teacher';

// var jane = Object.create(personProto, {
//     name: { value: 'jane' },
//     yearofBirth: { value: 1980 },
//     job: { value: 'Designer' }
// });




///////////////////////////////////////////////////////////////////////
//Lecture: Primitive vs Object
//Primitive -> hold data on it self
//Object -> hold the reference of the object (not real copy object)
// var a = 23;
// var b = a;
// a = 46;
// //hold their own copy of data
// console.log(a);
// console.log(b);

// //Hold the reference of the object that we create
// var obj1 = {
//     name:'john',
//     age:26
// };
// //Copy the reference of obj1
// var obj2 = obj1;
// obj1.name = 'boy';
// console.log(obj1.name);
// console.log(obj2.name);

// //Functions
// var age = 27;
// var obj = {
//     name:'Jonas',
//     city:'Lisbon'
// };

// function change(a,b){
//     a = 30;
//     //Change the city attribute of the real object
//     //We pass the reference
//     b.city = 'San Francisco'
// }

// change(age,obj);
// console.log(age);
// console.log(obj.city);





///////////////////////////////////////////////////////////////////////
//Lecture: function as argument
// var years = [1990, 1991, 1989, 2000, 2005];
// //fn is the callback function
// function arrayCall(arr, fn) {
//     var ans = [];
//     for (var i = 0; i < arr.length; i++) {
//         ans.push(fn(arr[i]));
//     }
//     return ans;
// }

// function calculateAge(yearofBirth) {
//     return 2020 - yearofBirth;
// }

// function isFullAge(el) {
//     return el >= 18;
// }

// function maxHeartRate(el) {
//     if (el >= 18 && el <= 81) {
//         return Math.round(206.9 - (0.67 * el));
//     } else {
//         return -1;
//     }
// }
// //pass the function calculateAge as the atgument
// var ages = arrayCall(years, calculateAge);
// var fullAges = arrayCall(ages, isFullAge);
// var rates = arrayCall(ages, maxHeartRate);
// console.log(ages);
// console.log(fullAges);
// console.log(rates);



///////////////////////////////////////////////////////////////////////
//Function returning function
//Function is also object
// function interviewQuestion(job) {
//     if (job === 'Designer') {
//         return function (name) {
//             console.log(name + ', can use please explain what UX design is?');
//         };
//     }
//     else if (job == 'Teacher') {
//         return function (name) {
//             console.log('What subject do you teach, ' + name + '?');
//         }
//     }
//     else {
//         return function (name) {
//             console.log('Hello, ' + name + ', what do you do?');
//         }
//     }
// }

// //teacherQuestion will be function (function expression)
// var teacherQuestion = interviewQuestion('Teacher');
// var designerQuestion = interviewQuestion('Designer');
// teacherQuestion('John');
// designerQuestion('Jane');

// //Evaluate from left to right, return function and then invoked it (pass 'Mark' as argument)
// interviewQuestion('Teacher')('Mark');





///////////////////////////////////////////////////////////////////////
//Lecture: IIFE
// (function () {
//     var score = Math.random() * 10;
//     console.log(score >= 5);
// })();

// //For createing new scope (data privacy), cannot reuse this function
// (function (goodLuck) {
//     var score = Math.random() * 10;
//     console.log(score >= 5-goodLuck);
// })(5);



///////////////////////////////////////////////////////////////////////
//Lecture: Closures
// function retirement(retirementAge) {
//     var a = ' years left until retirement.';
//     return function (yearofBirth) {
//         var age = 2020 - yearofBirth;
//         console.log((retirementAge - age) + a);
//     };
// }

// var retirementUS = retirement(66);
// retirementUS(2000);
// var retirementGermany = retirement(65);
// retirementGermany(2000);
// var retirementIceland = retirement(67);
// retirementIceland(2000);


// //Power of clousures
// function interviewQuestion(job) {
//     return function (name) {
//         if (job === 'Designer') {
//             console.log(name + ', can use please explain what UX design is?');
//         }
//         else if (job === 'Teacher') {
//             console.log('What subject do you teach, ' + name + '?');
//         }
//         else {
//             console.log('Hello, ' + name + ', what do you do?');
//         }
//     }
// }

// interviewQuestion('Teacher')('Thanaphon');





///////////////////////////////////////////////////////////////////////
//Lecture: Bind, call and apply
// var john = {
//     name: 'John',
//     age: 26,
//     job: 'Teacher',
//     presentation: function (style, timeOfDay) {
//         if (style === 'formal') {
//             console.log('Good ' + timeOfDay + ' lady and gentleman! I\'m ' + this.name + ' I\'m a ' + this.job + ' I\'m ' + this.age + ' years old');
//         }
//         else if (style === 'friendly') {
//             console.log('Hey what\'s up I\'m ' + this.name + ' I\'m a ' + this.job + ' I\'m ' + this.age + ' years old' + ' Have a nice ' + timeOfDay + '.');
//         }
//     }
// };
// var emily = {
//     name: 'Emily',
//     age: 35,
//     job: 'Designer'
// };
// john.presentation('formal','morning');

// //Call method borrowing
// //Emily borrow presentation method from john!!
// john.presentation.call(emily,'formal','morning');

// //Bind method will return the function
// var johnFriendly = john.presentation.bind(john,'friendly');
// johnFriendly('morning');
// johnFriendly('night');

// var emilyFormal = john.presentation.bind(emily,'formal');
// emilyFormal('afternoon');




// var years = [1990, 1991, 1989, 2000, 2005];
// //fn is the callback function
// function arrayCall(arr, fn) {
//     var ans = [];
//     for (var i = 0; i < arr.length; i++) {
//         ans.push(fn(arr[i]));
//     }
//     return ans;
// }

// function calculateAge(yearofBirth) {
//     return 2020 - yearofBirth;
// }

// function isFullAge(limit,el) {
//     return el >= limit;
// }

// var ages = arrayCall(years,calculateAge);

// //bind method will return the function
// //limit = 20
// var fullJapan = arrayCall(ages,isFullAge.bind(this,20));
// console.log(ages);
// console.log(fullJapan);

///////////////////////////////////////////////////////////////////////
//Coding Challenge: 7
(function () {
    var Question = function (question, answer, correctAnswer) {
        this.question = question;
        this.answer = answer;
        this.correctAnswer = correctAnswer;
        this.print = function () {
            console.log(this.question);
            for (var i = 0; i < this.answer.length; i++) {
                console.log(i + ': ' + this.answer[i]);
            }
        }
        this.checkAnswer = function (userAnswer, score) {
            if (parseInt(userAnswer) === this.correctAnswer) {
                console.log('Correct!');
                score++;
            }
            else {
                console.log('Incorrect');
            }
            console.log('Your current score: ' + score);
            console.log('----------------------------------');
            return score;
        }
    };

    var q1 = new Question('What is my name?', ['boy', 'james', 'non'], 0);
    var q2 = new Question('What is my birthday?', [12, 18, 14], 2);
    var q3 = new Question('Am I handsome?', ['No', 'Yes'], 1);
    var myQuestion = [q1, q2, q3];
    var score = 0;
    function getAnswer() {
        var num = Math.floor(Math.random() * myQuestion.length);
        myQuestion[num].print();
        var userAnswer = prompt('Please select the correct answer (just type the number)');
        if (userAnswer !== 'exit') {
            var newScore = myQuestion[num].checkAnswer(userAnswer, score);
            score = newScore;
            getAnswer();
        }
    }
    getAnswer();
})();
