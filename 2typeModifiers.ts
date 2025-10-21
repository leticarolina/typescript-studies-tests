////////////////////////////////////////////////////////////////////////////////////////
// UNIONS
////////////////////////////////////////////////////////////////////////////////////////

//A union type means a variable can hold one of several types, using the | symbol
//Real use
//Optional values: string | undefined
//API responses: number | null
//IDs: string | number
//Also used for literal unions like "Complete" | "Incomplete"

// variable ?: string; this syntax '?' is a union of type | undefined

let value: string | number; //this variable can be either this type or that type
value = "Letícia"; 
value = 27;        


let id: string | number = 6;
id = 7;
// id = true; //Type 'boolean' is not assignable to type 'string | number'.ts(2322)

type Person = { id: number | string, isProgrammer?: boolean }
// const leti: Person = { id: "0x01", isProgrammer: true };

function leti({id, isProgrammer} :Person) {
  console.log(id, isProgrammer);
}
leti({ id: "leticia", isProgrammer: true }); //leticia true


type Todo = {
  name: string,
  status: "Complete" | "Incomplete" | "Draft"
}
//on status can only use one of default string values
// const todo: Todo = { name: "Laudry", status: "Done" }; //Type '"Done"' is not assignable to type '"Complete" | "Incomplete" | "Draft"'.


//union of two types, ps:interfaces doesnt do these union just types
type Merge = Person | Todo;
const newTask: Merge = { name: "dishwash", status: "Incomplete" };

//checking type before using it
if (typeof newTask.name === "string") console.log(newTask.name.toUpperCase()); //DISHWASH

////////////////////////////////////////////////////////////////////////////////////////
// INTERSECTIONS
////////////////////////////////////////////////////////////////////////////////////////
//Combine multiple types together → must have all their properties.
//Used for composing types (ex: User & Address)

type Cat = { meow: () => void };
type Dog = { bark: () => void };
type Pet = Cat & Dog; // must have BOTH meow() and bark()
const hybrid: Pet = {
  meow: () => console.log("meowing"),
  bark: () => console.log("barking"),
};
hybrid.bark(); //barking
hybrid.meow(); //meowing

//Person and Employee 
type Employee = { category: number };
type Staff = Person & Employee;
type StaffErrror = Person & string; //an object can’t also be a primitive string.
const leticia: Staff = { id: "Letícia",isProgrammer: true ,  category: 7};
console.log(leticia); //{id: 'Letícia', isProgrammer: true, category: 7}


////////////////////////////////////////////////////////////////////////////////////////
// readonly
////////////////////////////////////////////////////////////////////////////////////////
//`readonly` makes a property **immutable** after the object is created, can’t reassign
//readonly applies per instance, not globally
//You’ll use it in data models, config constants, or blockchain structs.
type Token = { readonly id: string; name: string };

type FixedPerson = { readonly id: number, name: string, year: number, color: string | number }
const myself: FixedPerson = { id: 1, name: "Leti", year: 1997, color: "Purple" };
myself.name = "Letícia";   //  allowed
// myself.id = 2; // Error: Cannot assign to 'id' because it is a read-only property
//Once myself.id is set, you can’t change that one, but you can create new objects with different IDs

////////////////////////////////////////////////////////////////////////////////////////
// keyof
////////////////////////////////////////////////////////////////////////////////////////
//Turns an object’s keys into a union of strings.
//a union type of all property names (keys) of a given type

type Traits = {
  tall: number;
  eyes: string;
  smile: number;
};

//the property we are setting for this type is gonna be one of the keys from Traits
//gives you the keys of an object type.
type singleTrait = keyof Traits; //"tall" | "eyes" | "smile"

let height: singleTrait = "tall";
// let head: SingleTrait = "hair"; // Error: "hair" not in Traits

// Common pattern:
function getValue(obj: Traits, key: keyof Traits) {
  return obj[key];
}
const personTraits: Traits = { tall: 171, eyes: "brown", smile: 10 };
console.log(getValue(personTraits, "eyes")); // "brown"

//example with keyof to group by keys 
//  === to be reviewd
const people: Traits[] = [
  { tall: 180, eyes: "green", smile: 5 },
  { tall: 170, eyes: "blue",  smile: 9 },
  { tall: 185, eyes: "brown", smile: 10 },
];
function groupBy(people: Traits[], key: keyof Traits) {
  return people.reduce((acc, item) => {
    const groupKey = String(item[key]); 
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, Traits[]>);
}
const groupedByEyes = groupBy(people, "eyes");
console.log(groupedByEyes);

////////////////////////////////////////////////////////////////////////////////////////
// typeof
////////////////////////////////////////////////////////////////////////////////////////
//lets you create a type based on the type of an existing variable or object
//It’s like saying: “Use the same type as that thing over there.”
//Useful to avoid repeating type definitions.
//Often combined with `keyof` for dynamic typing, gets key names of an object constant

const person = {
  name: "Letícia",
  year: 1997,
  color: "purple",
};

// Create a type directly from the object, basically a copy of the const person
// type NewType = typeof existingVariable;
type PersonType = typeof person;
// same as = { name: string; year: number; color: string }

const friend: PersonType = { name: "Fernanda", year: 1992, color: "green" }; // OK

// Combine typeof + keyof
type PersonKeys = keyof typeof person; // "name" | "age" | "color"
let key: PersonKeys = "color"; // type-safe


//type of with functions
function sayHello(greeting: string) {
  console.log(greeting);
}
type Languages = typeof sayHello; //Here typeof sayHello gives you the function’s type, not its parameter type.
//type Languages = (greeting: string) => void; That means it expects a function.

const spanish: Languages = (msg) => {
  console.log(msg)
};
spanish("Hola"); //Hola

////////////////////////////////////////////////////////////////////////////////////////
// INDEX TYPES
////////////////////////////////////////////////////////////////////////////////////////
// Index types let you access the **type of a specific property** inside another type.
//the syntax:  TypeName["propertyName"]
//Great for extracting or reusing property types, works with `keyof`

// Example: access a property type
type NameType = Person["id"]; // number | string
type ProfessionType = Person["isProgrammer"];// boolean
// Usage example
const exampleName: NameType = "Leticia";
console.log(exampleName); //Leticia
const exampleProfession: ProfessionType = true;

// Combine with keyof
//gives you the types of the values inside that object.
type PropertyType = Person[keyof Person]; //(union of all value types) // number | string | boolean  (whatever the value types are)

//Type["key"] → gets the type of that property.
//Type[keyof Type] → gets a union of all property value types.

//another example
type Level = { name: string, skillLevel: "Beginner" | "Intermediate" | "Expert" }; 
type OnlyLevel = Level["skillLevel"]; //OnlyLevel = "Beginner" | "Intermediate" | "Expert", extracting just the skillLevel property type

const candidate1: Level = { name: "Leticia", skillLevel: "Expert" }; //create a candidate1 variable of type Level
function printLevel(level: OnlyLevel) { //can also pass level: Level["skillLevel"] as type directly
  console.log(level);
}
printLevel(candidate1.skillLevel); //Expert


//another example index types, using index access ([number]) to extract all possible element types from the array.
const a = ["abc", 123, true];
type ArrayType = (typeof a)[number]; //typeof a → gets the type of the array, like (string | number | boolean)[]
//[number] → means go thru every number index and the type of whatever is at in that array is gonna be my type

let arrayValue: ArrayType;
arrayValue = "hello"; //OK
arrayValue = 456;     //OK
arrayValue = false;   //OK
// arrayValue = null;    //Error: Type 'null' is not assignable to type 'string | number | boolean'.