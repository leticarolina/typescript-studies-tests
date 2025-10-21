////////////////////////////////////////////////////////////////////////////////////////
// AS CONST AND ENUS
////////////////////////////////////////////////////////////////////////////////////////
//as const can only be used on js code and not typescript code, need to use Readonly built in to make a fixed type out of another type
const as = 1; //type is 1 - hardcoded
let be = 1; //type is number
let c = 1 as const; //type is 1 - as const means treat as constant never change

const nums = ["one","two" ,"three"] as const; //const nums: readonly ["one", "two", "three"]
const first = nums[0]; //const first: "one"
console.log(first); //one

//using Enums
const SKILL_LEVELS = ["begginer", "intermediate", "Expert"] as const; //type is literal values readonly ["begginer", "intermediate", "Expert"]
type Persona = {
  skillLevel: (typeof SKILL_LEVELS)[number]
//skillLevel = "begginer" | "intermediate" | "Expert"
}

//SKILL_LEVELS is a real JS array just added as const keyword, so can loop it like always
SKILL_LEVELS.forEach((index) => {
  return console.log(index); // begginer intermediate Expert
});

//with objects
const favoriteDays = { monday: false, tuesday: false, wednesday: false, friday: true } as const;
//const favoriteDays: {
  // readonly monday: false;
  // readonly tuesday: false;
  // readonly wednesday: false;
  // readonly friday: true;
// }
//everyhting becomes readonly on the object

////////////////////////////////////////////////////////////////////////////////////////
// TUPLES
////////////////////////////////////////////////////////////////////////////////////////
//Tuple = fixed-length array with specific types in each position
type Tuple = [string, boolean];
const combine: Tuple = ['first', true];

let user: [string, number] = ["Leti", 27]; //user is a tuple

getUser(user);
//Function destructures its parameter: [x, y]
//Output: the same tuple type [string, number]
function getUser([x, y] : [string, number]) {
  return [x, y];
}


////////////////////////////////////////////////////////////////////////////////////////
// GENERICS advanced
////////////////////////////////////////////////////////////////////////////////////////
//Generics = placeholders for types.
//I don’t know what type it’ll be yet, let’s use a variable for it.

//trying to get an element and specifying the type
const input = document.querySelector<HTMLInputElement>(".input")!; //type is HTMLInputElement

//generic function
//T is a placeholder for the type that will be used when calling the function
//T is a convention, can be any name but usually T is used for type
//T[] means an array of whatever type T is
//function getElement<T>(array: T[]): T { //specifying that the return type is also T
//no type for the array until you call the function and specify the type
function getElement<T>(array: T[]) {
  console.log(array[0])
  return array[0];
}
const a1 = [1, 2, 3];
const a2 = ["yea", "no", "maybe"];
//specifying the type here
getElement(a1);//1
getElement(a2);//yea
getElement<string>(a2);//can also specify the type here but ts already inferred it


//map and set type
const myMap = new Map<string, number>();
myMap.set("apples", 5);
myMap.set("bananas", 10);

const mySet = new Set<number>();
mySet.add(1);
mySet.add(2);
mySet.add(3);
// mySet.add(2); //duplicate, won't be added
// mySet.add("4"); //Error, string is not assignable to number

//api
//generic type for api response, T is a placeholder for the data type
type ApiResponse<T> = {
  data: T;
  isError: boolean;
}

//creating a specific type using the generic ApiResponse
//T will be replaced by different types, these are object types
type User = ApiResponse<{ name: string; age: number }>; 
type Products = ApiResponse<{ id: number; price: number }[]>;

//usage example
//const userResponse: ApiResponse<{ name: string; age: number }>
const userResponse: User = {
  data: { name: "Leticia", age: 27 },
  isError: false
};

const productsResponse: Products = {
  data: [
    { id: 1, price: 10 },
    { id: 2, price: 20 }
  ],
  isError: false
};


//exmple of generic with default type parameter
function createArray<T = string>(length: number, value: T): T[] {
  return Array.from({ length }, () => value);
  //Array is a built-in JS function that creates an array from an array-like or iterable object.
}

const stringArray = createArray(3, "hello"); // type is default string[]
console.log(stringArray); // ['hello', 'hello', 'hello']

const numberArray = createArray<number>(3, 42); // type is number[]
console.log(numberArray); // [42, 42, 42]


//example of generic constraint turning an array into an object
function arrayToObject<T>(array: [string ,T][]) { 
  const obj: { [index: string]: T } = {};
  array.forEach(([key, value]) => {
    obj[key] = value;
  });
  console.log(obj);
  return obj;
}

// arrayToObject([[1, "one"], [2, "two"], [3, "three"]]); //Error, key must be string
arrayToObject([["1", 1], ["2", 2], ["3", 3]]); //{1: 1, 2: 2, 3: 3}
arrayToObject<string | number>([["1", 1], ["2", "two"], ["3", 3]]); //OK, value can be string or number {1: 1, 2: 'two', 3: 3}

////////////////////////////////////////////////////////////////////////////////////////
// ASYNC FUNCTIONS
////////////////////////////////////////////////////////////////////////////////////////
//when dealing functions that return promises, need to specify the type of value that the promise will resolve to
//by default if no type is specified, the return type is Promise<unknown>
function wait(duration: number) {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`Waited for ${duration} milliseconds`);
    }, duration);
  });
}
//the return of message type is Promise<unknown>
// wait(1000).then((message) => console.log(message.length)); //'message' is of type 'unknown'.

// after declare as return new Promise<string> 
//specifying the return type of the promise
wait(1000).then((message) => console.log(message.length)); //28

//if you have an async function that returns a value, the return type is Promise<type of value>
async function fetchData() : Promise<number> {
  return 42;
}
//because fetchData returns Promise<number>, data is already inferred as number
fetchData().then((data) => console.log(data.toFixed(2))); //42.00
