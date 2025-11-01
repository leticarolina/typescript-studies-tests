//npx tsc filename.ts // runs the TypeScript compiler manuall
//optional --noEmmitOnError //tells the compiler: If there are type errors, don’t output any JS file.
//when using Vite, Next.js, or Create React App these tools already run the TypeScript compiler behind the scenes.

//initalizing ts with vite
//npm create vite@latest
//npm install
//npm run dev 

//initalizing ts with next
//npx create-next-app@latest

////////////////////////////////////////////////////////////////////////////////////////
// PRIMITIVE TYPES 
////////////////////////////////////////////////////////////////////////////////////////
//they store simple values, not objects.
//primitive types : string, number, boolean, bigint, null, undefined
//arrays and objects are not primitive types, they’re reference types

//js vanilla
let j = "hello";
console.log(j);

//typescript syntax
let variable: string = "hello typescript"
console.log(variable)
// cannot change type of variable
// variable = null; //Type 'null' is not assignable to type 'string'.ts(2322)


//null and undefined are different types, but the value need to be splicity set otherwise default to :any
let aa = undefined; //no type :any, an undefined value could be any type
// aa = null; //Type 'null' is not assignable to type 'undefined'.ts(2322)
console.log(aa); //null
//for this to show error due to different types need to set type of a: undefined

//any = TypeScript stop checking types here
//means any type, since type was not set
//let b: any (bad idea)
let b = null; //no type set, could be any type
// b = undefined;
// console.log(b); //undefined
// b = "hi";
// console.log(b); //hi
// b = 4;
// console.log(b); //4
//ps: In newer / strict mode let b = null; now infers the type as null, not any.

let birthday: Date = new Date("1997-02-12"); // ✅ should be Date, not string
//type is Date because of the new Date() constructor, not because of the string passed in.
//other similar constructors: new RegExp(), new Map(), new Set(), etc

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


const shoppingList: (string | number)[] = [1, 2, "leticia"];
shoppingList.push("carolina");
// shoppingList.push(true); //Argument of type 'boolean' is not assignable to parameter of type 'string | number'

//Create a function that takes an array of numbers and returns the sum
function sumArray(numbers: number[]): number { //input must be an array of numbers
  return numbers.reduce((acc, num) => acc + num, 0);
}
const nums = [1, 5, 4];
console.log(sumArray(nums)); // 10
//this pattern is very common in React hooks, reducers

////////////////////////////////////////////////////////////////////////////////////////
// OBJECT TYPES
////////////////////////////////////////////////////////////////////////////////////////
const personn = { name: "Leticia", age: 1997 };
console.log(personn); //{name: 'Leticia', age: 1997}
// person.isProgrammer = true; //Property 'isProgrammer' does not exist on type '{ name: string; age: number; }'
//cannot push isProgrammer bcs it was not set on the object type of '{ name: string; age: number; }'

const personWithAddOn: { name: string, age: number, isProgrammer?: boolean } = { name: "Leticia", age: 1997 };
// ? question markey after key leave stat as optional, may define or not
console.log(personWithAddOn); //personWithAddOn

//creating an object type
//declare type TypeVariable starting with upper case
export type Personn = { name: string, age: number, address: (string | number)[] };//need to set type of array keys 
const personA: Personn = { name: "leticia", age: 1997, address: ["leti", 2, 3] };
// personA.address.push(true); // Error, address array doesn't take boolean
console.log(personA);


//nesting an array type ninside the object
type FavoriteNumbers = (number | string)[];
type nameAndBirthYear = {name: string, year: number | boolean, favNumber: FavoriteNumbers };
const lety: nameAndBirthYear = { name: "Leticia", year: 1997, favNumber: [7, "seven", 89 ] };
console.log(lety); 

//(number | string) union type it can be a number or a string.
// type Test = (number | string){}  // ❌ with object is invalid, you must tell it something about the keys.
type GenericKeys = { a: number; b: number }; //Simple and explicit.
type StringKey = { [key: string]: number }; // For any key (string), the value must be a number.
type RecordType = Record<string, number>; //Record< KeyType , ValueType > Record is a standard utility type, Object with dynamic keys
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
//() :number means the type function will return, however 99% typescript already load this so no need to set
//(param1: number, param2: number): number 
//Only add the ():returnType when you want explicit clarity or to enforce a specific return type

//------------------defining an object as parameter
function printPerson(person: { name: string}) {
  console.log(person);
}
// printPerson({ name: "Leticia", year: 1997 }); //❌ it sees year doesn’t exist in the function type ( excess property check)
const newPerson = { name: "Leticia", year: 1997 }; //When you store the object in a variable first TypeScript accept this variable might have extra stuff
printPerson(newPerson); //newPerson has what function needs (name), extra stuff is fine


//------------------void functions - means this function has no return value, has no return keyword
//return undefined → means the function explicitly returns undefined
//function city(cityName: string): void
function city(cityName: string) :void {
  "My favorite city is " + cityName;
}
city("amsterdam");


//------------------optional parameters
//healthy?: boolean; question mark makes parameter optional
function foodList(amount: number, food: string, healthy?: boolean) {
  console.log(amount, food, healthy);
}
foodList(3, "strawberry"); //3 'strawberry' undefined 

//------------------optional parameters another example using options object
//options is just a naming convention, means an object of optional settings or parameters for this function
function selectivePrint(name: string, options: { age?: number; active?: boolean }) {
  console.log(name, options);
};
selectivePrint("Leti", { age: 1997 }); // active?: boolean was ignored


//------------------destructing
function greeting({ name, age }: { name: string; age: number }) {
  console.log(name, age);
}
greeting({name: "leticia",age: 1997});
//Same thing, but cleaner
type Erson = { name: string; age: number };
function greetType({ name, age }: Erson) {
  console.log(name, age);
}
function greetDefault({ name = "Guest", age = 18 }: { name?: string; age?: number }) {
  console.log(name, age);
} 

//------------------resting parameters operator
function restingSum(...nums: number[]) {
  return nums;
}
restingSum(1, 2, 3, 4);
restingSum(45, 56);


//------------------PASSING CALLBACKS
function sayHiFunction(name: string): void { //actual function that matches that type.
  console.log("Hi", name);
}
sayHiFunction("Letícia"); //calluing func regularly
let sayHi: (name: string) => void; //create variable sayHi of type function and 1 param
sayHi = sayHiFunction; //assigning the function to the variable
sayHi("Testing Leticia");

//------------------Typing a function parameter that is a callback
function runTwice(callback: (num: number) => void) {
  callback(1);
  callback(2);
}
runTwice((n) => console.log(n * 2)); // log 2 and 4


function calculate(fn: (x: number, y: number) => number) {
  return fn(2, 3);
}
calculate((a, b) => a + b); // 5

//------------------Using type alias for cleaner code
type MathOp = (x: number, y: number) => number;
function runOperation(fn: MathOp) {
  return fn(5, 10);
}
runOperation((a, b) => a + b); //15



////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//                               EXERCISES OF THE FILE
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//-----------------OBJECTS
//1.Create a type for a Product object
//Write a function that accepts an object of type Product and logs its name and price.
type Product = {
  id: number;
  name: string;
  price: number;
  category?: string | number; // optional
};
function printProduct(product: Product): void {
  console.log(`${product.name} costs $${product.price}`);
}

printProduct({ id: 1, name: "Chocolate", price: 3 });

//2. Define an array of Product objects and write a function that filters products cheaper than $50.
const products: Product[] = [
  { id: 1, name: "Chocolate", price: 52 },
  { id: 2, name: "Panetone", price: 48 },
];
function cheaperProducts(arr: Product[]): Product[] {
  return arr.filter((p) => p.price < 50);
}
console.log(cheaperProducts(products)); // [{ id:2, ... }]


//3. You’re given this function:
function greet(user: User): string {
  return "Hello, " + (user.name?.toUpperCase() ?? "Guest");
}
//Write a proper type for user that prevents runtime errors if the object is missing name.
type User = { name: string }; //You need a type that ensures user.name always exists and is a string.


//-----------------FUNCTION
//1.reate a function greetz that:
//takes an optional name (string), if no name is provided, logs "Hello, Guest"
function greetz(name?: string) {
  console.log(`Hello ${name ?? "Guest"}`);
}
greetz();
greetz("Letícia");

//2.reate a function findUserAge that:
//receives an object { name: string, age?: number }, returns age if it exists, otherwise undefined
function findUserAge({ name, age }: { name: string; age?: number }): number | undefined {
  return age;
}
findUserAge({ name: "Leticia" }); //undefined


//3.Function type alias
//This is defining the “shape” of a function — reusability.
//Create a type alias called MathOperation that:
//represents a function taking two numbers and returning a number and use it to create both add and subtract functions.
type MathOperation = (a: number, b: number) => number; //like a template for any math function that takes two numbers and returns one.
const add: MathOperation = (a, b) => a + b;
const sub: MathOperation = (a, b) => a - b;



//4. Create a function applyOperation that:
//takes two numbers, takes a callback function (that accepts two numbers and returns a number)
//returns the result of that callback
function applyOperation(
  a: number,
  b: number,
  operation: (x: number, y: number) => number
): number {
  return operation(a, b);
}

const result = applyOperation(5, 3, (x, y) => x * y);
console.log(result); // 15


//5. Create a constant square assigned to an arrow function that:
//takes a number, returns that number squared
const square = (a: number): number => a * a;


//6.Create a function getDiscountedPrices that:
//takes an array of product prices (number[]) and a discount percentage (number)
//returns a new array with the discounted prices
function getDiscountedPrices(prices: number[], discount: number) {
  return prices.map((i) => {
    return i - i * (discount / 100);
    })
  }
console.log(getDiscountedPrices([10, 50, 100], 10));
  
