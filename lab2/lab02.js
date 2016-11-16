// Mark Davis | 1309096 | mjd85
//Calvin College CS336 lab02
//Professor Vander Linden
//Exercise 2.1

/*
this function creates object person prototype
parameters: name, birthdate, friendList
return: null
post: instance variables are given values
*/
function Person(name, birthdate, friendList) {
	this.myname = name;
	this.mybirthdate = birthdate;
	this.myfriends = friendList;
}

//mutator for changing the name
Person.prototype.changeName = function(newName){
	this.name = newName;
}

//mutator for adding new friend
Person.prototype.newFriend = function(newFriend){
	this.myfriends.push(newFriend);
}

//function for a greeting
function Greeting(Person) {
	console.log("Hello " + Person.myname);
}

//accessor for name
function getName() {
	return this.myname;
}

//accessor for birthdate
function getbirthdate() {
	return this.mybirthdate;
}

/*
accessor for getting age
* example code was found here: http://jsfiddle.net/codeandcloud/n33RJ/
* Author: Naveen Jose
*/
Person.prototype.getAge = function(mybirthdate) {
var today = new Date();
    var birthDate = new Date(mybirthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/////STUDENT SUBCLASS///////

function Student(name, birthdate, friendList, program) {
	Person.call(this, name, birthdate, friendList);
	this.myProgram = program;
}
Student.prototype = Object.create(Person.prototype);

function studentGreeting(Student) {
	console.log(Student.myname + " studies " + Student.myProgram);
}

/////TEST CASES//////

//create instances
var person1 = new Person("Mark", "1996/02/21", ["Dan", "Bob"]);
var person2 = new Person("Bob", "1990/05/23", ["Tim"]);
var stud1 = new Student("Bruce Wayne", "2000/04/30", ["Genius"], "Innovation");
var stud2 = new Student("Professor Xavier", "1976/06/22", ["No one"], "Undecided");

//test greeting
Greeting(person1);
Greeting(person2);
studentGreeting(stud1);
studentGreeting(stud2);

//test add friend
person1.newFriend(person2);
person2.newFriend(person1);
stud1.newFriend(stud2);
stud2.newFriend(stud1);

//compute ages
console.log(person1.myname + " is " + person1.getAge(person1.mybirthdate) + " years old.");
console.log(person2.myname + " is " + person1.getAge(person1.mybirthdate) + " years old.");
console.log(stud1.myname + " is " + stud1.getAge(stud1.mybirthdate) + " years old.");
console.log(stud2.myname + " is " + stud2.getAge(stud2.mybirthdate) + " years old.");

//compare ages
if (person1.getAge > person2.getAge) {
	console.log(person1.myname + " is older than " + person2.myname);
}
else {
	console.log(person2.myname + " is older than " + person1.myname);
}







