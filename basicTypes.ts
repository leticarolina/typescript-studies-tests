//npx tsc filename.ts // compile code
//optional --noEmmitOnError

//initalizing ts with vite
//npm create vite@latest
//npm i
//npm run dev 

////////////////////////////////////////////////////////////////////////////////////////
// PRIMITIVE TYPES 
////////////////////////////////////////////////////////////////////////////////////////

//primitive types : string, number, boolean, bigint, null
//arrays and objects are not primitive types, they’re reference types

//js
let j = "hello";
console.log(j);

//typescript syntax
let variable: string = "hello typescript"
console.log(variable)
// variable = null; //Type 'null' is not assignable to type 'string'.ts(2322)


//null and undefined are different types, but the value need to be splicity set otherwise default to :any
let a = undefined; //no type :any, an undefined value could be any type
// a = null; //Type 'null' is not assignable to type 'undefined'.ts(2322)
console.log(a); //null
//for this to show error due to different types need to set type of a: undefined

//any = TypeScript stop checking types here
//means any type since type was not set
//let b: any (bad idea)
let b = null; //no type set, could be any type
// b = undefined;
// console.log(b); //undefined
// b = "hi";
// console.log(b); //hi
// b = 4;
// console.log(b); //4
//In newer / strict mode let b = null; now infers the type as null, not any.

// const ab = JSON.parse("asbd"); //ab is any
// console.log(ab); 

////////////////////////////////////////////////////////////////////////////////////////
// ARRAY TYPES
////////////////////////////////////////////////////////////////////////////////////////
//type number[] = array of numbers

const array: number[] = [1, 2, 3];
// array.push("four"); //Argument of type 'string' is not assignable to parameter of type 'number'.
array.push(4); //can modify a const because array/objects are passed by reference type not value, so type is not changing
console.log(array); //(4) [1, 2, 3, 4] 


////////////////////////////////////////////////////////////////////////////////////////
// OBJECT TYPES
////////////////////////////////////////////////////////////////////////////////////////
const person = { name: "Leticia", age: 1997 };
console.log(person); //{name: 'Leticia', age: 1997}
// person.isProgrammer = true; //Property 'isProgrammer' does not exist on type '{ name: string; age: number; }'
//cannot push isProgrammer bcs it was not set on the array type of '{ name: string; age: number; }'

const personWithAddOn: { name: string, age: number, isProgrammer?: boolean } = { name: "Leticia", age: 1997 };
// ? question markey after key leave stat as optional, may define or not
console.log(personWithAddOn); //personWithAddOn

//creating an object type
//declare type TypeVariable starting with upper case
type Person = { name: string, age: number, address: (string | number)[] };//need to set array keys type
const personA: Person = { name: "leticia", age: 1997, address: ["leti", 2, 3] };
// personA.address.push(true); // Error, address array doesn't take boolean
console.log(personA);


//nesting an array type ninside the object
type FavoriteNumbers = (number | string)[];
type nameAndBirthYear = {name: string, year: number | boolean, favNumber: FavoriteNumbers };
const leticia: nameAndBirthYear = { name: "Leticia", year: 1997, favNumber: [7, "seven", 89 ] };
console.log(leticia); 

//(number | string) union type it can be a number or a string.
// type Test = (number | string){}  // ❌ invalid, you must tell it something about the keys.
type GenericKeys = { a: number; b: number }; //Simple and explicit.
type StringKey = { [key: string]: number }; // For any key (string), the value must be a number.
type RecordType = Record<string, number>; //Record< KeyType , ValueType > Record is a standard utility type
//An object where all keys are of type string and all values are of type number

//interfaces can only be used with object, similar syntax to type but remove equal sign
type Mixed = { [key: number]:  string | number, b?: boolean };
interface MixedInterface { a: boolean | number, b: string };
// const list: MixedInterface = { 3: "juice", 5: "banana" }; // ❌ fails bcs a and b are specific property names, not placeholders for any key.
const list: MixedInterface = { a: 3, b: "banana" };
const randomList: Mixed = { 3: "string | number" }
console.log(list);
console.log(randomList);

////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////
function printNumber(param1: number, param2:number) :number { 
  return param1 + param2;
}
console.log(printNumber(1, 2)); //3
//:number means the type function will return, however 99% typescript already load this so no need to set
//(param1: number, param2: number): number 
//Only add the :returnType when you want explicit clarity or to enforce a specific return type

//defining an object as parameter
function printPerson(person: { name: string}) {
  console.log(person);
}
// printPerson({ name: "Leticia", year: 1997 }); //❌ it sees year doesn’t exist in the function type ( excess property check)
const newPerson = { name: "Leticia", year: 1997 }; //When you store the object in a variable first TypeScript accept this variable might have extra stuff
printPerson(newPerson); //newPerson has what function needs (name), extra stuff is fine


//void functions - means this function has no return value, has no return keyword
//return undefined → means the function explicitly returns undefined
//function city(cityName: string): void
function city(cityName: string) :void {
  "My favorite city is " + cityName;
}
city("amsterdam");


//optional parameters
//healthy?: boolean; question mark makes parameter optional
function foodList(amount: number, food: string, healthy?: boolean) {
  console.log(amount, food, healthy);
}
foodList(3, "strawberry"); //3 'strawberry' undefined 

//optional parameters another example using options object
//options is just a naming convention, means an object of optional settings or parameters for this function
function selectivePrint(name: string, options: { age?: number; active?: boolean }) {
  console.log(name, options);
};
selectivePrint("Leti", { age: 1997 }); // active?: boolean was ignored


//destructing
function greet({ name, age }: { name: string; age: number }) {
  console.log(name, age);
}
greet({name: "leticia",age: 1997});

//Same thing, but cleaner
type Erson = { name: string; age: number };
function greetType({ name, age }: Erson) {
  console.log(name, age);
}

function greetDefault({ name = "Guest", age = 18 }: { name?: string; age?: number }) {
  console.log(name, age);
} 

//resting parameters operator
function restingSum(...nums: number[]) {
  return nums;
}
restingSum(1, 2, 3, 4);
restingSum(45, 56);


//passing callbacks
let sayHi: (name: string) => void; //variable typed as a function.

// sayHi = (name) => console.log("Hi", name);
function sayHiFunction(name: string): void { //actual function that matches that type.
  console.log("Hi", name);
}
sayHi = sayHiFunction;
sayHiFunction("Letícia");

// Typing a function parameter that is a callback
function runTwice(callback: (num: number) => void) {
  callback(1);
  callback(2);
}
runTwice((n) => console.log(n * 2)); // log 2 and 4


function calculate(fn: (x: number, y: number) => number) {
  return fn(2, 3);
}
calculate((a, b) => a + b); // 5

//Using type aliases for cleaner code
type MathOp = (x: number, y: number) => number;
function runOperation(fn: MathOp) {
  return fn(5, 10);
}
runOperation((a, b) =>  a + b); //15








