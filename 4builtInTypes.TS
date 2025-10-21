////////////////////////////////////////////////////////////////////////////////////////
// PICK AND OMIT
////////////////////////////////////////////////////////////////////////////////////////
//Creates a new type by picking or omitting only some properties from another type.
type Persone = { name: string; age: number; city: string, weight: number };
type BasicInfo = Pick<Persone, "name" | "age">; // { name: string; age: number } here is not name OR age, its both
type WithoutCity = Omit<Persone, "city">; // { name: string; age: number, weight: number }

//Real use
//Selecting partial data from APIs or database models.
//In React props: reuse a type but remove a field you’ll override.

type ButtonProps = Omit<HTMLButtonElement, "onClick">;

////////////////////////////////////////////////////////////////////////////////////////
// PARTIAL AND REQUIRED
////////////////////////////////////////////////////////////////////////////////////////
//Partial Use when updating or creating where keys are optional
type Ela = { name: string; age: number };
type PartialEla = Partial<Ela>; // { name?: string; age?: number }
let user1: PartialEla = {name: "Letícia"};

//Required Makes all properties required (the opposite) Use when you want to ensure every field is filled in
type Ele = { name?: string; age?: number };
type FullPerson = Required<Ele>;// { name: string; age: number }

//Partial and Required only affect the first level of the object
//If you want it to work deeply, you need a custom type like:
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

////////////////////////////////////////////////////////////////////////////////////////
// RETURN TYPE AND PARAMETERS
////////////////////////////////////////////////////////////////////////////////////////
//ReturnType = 
// extracts the type that a function returns.
function getName() {
  return "Letícia";
}
type Stringfied = ReturnType<typeof getName>; // string
const avar: Stringfied = ""; //avar: string


function checkLength(a: string, b: number):boolean {
  return a.length < b; //return true if a.length is less than b
}
//ReturnType<> takes in a type and it must be a function and it will give what the func returns
//it's good if you want to get whatever that function returns
type ReturnOfLengthCheck = ReturnType<typeof checkLength>;//boolean
const kati: ReturnOfLengthCheck = checkLength("leticia", 10)
console.log(kati); //true

//Parameters = 
// extracts the types of a function’s parameters as a tuple.
type returnParams = Parameters<typeof checkLength>;
type onlySecondParam = Parameters<typeof checkLength>[1]; //onlySecondParam = number
const mimi: returnParams = ["say", 1]; // mimi: [a: string, b: number]
console.log(mimi); //(2) ['say', 1]


function greets(name: string, age: number) {
  console.log(name, age);
}
type GreetParams = Parameters<typeof greets>; // [string, number]
const args: GreetParams = ["Letícia", 27];
greets(...args);

type Func = () => void;
type Params = Parameters<Func>; //Params = [] 


////////////////////////////////////////////////////////////////////////////////////////
// RECORD
////////////////////////////////////////////////////////////////////////////////////////
//Record<K, T> is a shortcut for creating an object type
//K = the key type
//T = the value type
//An object with keys of type K and values of type T

// type PeopleGroupedByName = {
//   [index: string]: Person[];
//   //the keys of this object can be any string
//   //each value for those keys is an array of Person
// }
type PeopleGroupedByName = Record<string, Persone[]>; // [x: string]: Person[]; same as example above 
type PeopleByCity = Record<Persone["city"], Persone[]>;

const groupedByCity: PeopleByCity = {
  SP: [{ name: "Letícia", city: "SP", age: 1997, weight: 58 }],
  Rio:[{ name: "Carolina", city: "Rio", age: 1992, weight: 85 }]
};


//Example 2 — limited keys
type Roles = "admin" | "user" | "guest";
type Permissionss = Record<Roles, boolean>;

const access: Permissionss = {
  admin: true,
  user: false,
  guest: false,
};


////////////////////////////////////////////////////////////////////////////////////////
// READONLY
////////////////////////////////////////////////////////////////////////////////////////
//when you can to make a immutable type out of another available type
//Makes all properties of a type immutable you can read them, but not change them
type FrozenPerson = Readonly<Persone>;
/*type FrozenPerson = {
  readonly name: string;
  readonly age: number;
  readonly city: string;
  readonly weight: number;
}*/

//can only set once
const paty: FrozenPerson = { name: "Patricia", city: "Caragua", age: 2000, weight: 70 }; //Cannot redeclare block-scoped variable 'user'
console.log(paty); //{name: 'Patricia', city: 'Caragua', age: 2000, weight: 70}
// paty.name = "Carol"; //  Error: cannot assign to 'name' because it is a read-only property
console.log(paty.name); //Patricia

////////////////////////////////////////////////////////////////////////////////////////
// AWAITED
////////////////////////////////////////////////////////////////////////////////////////
//Awaited<T> gets the resolved type of a Promise<T>
//common to use inside async functions

async function doSomething() { //doSomething(): Promise<number>
  //some async code here
  return 22;
}

type Value = Awaited<ReturnType<typeof doSomething>>; //type Value = number