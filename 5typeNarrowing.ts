////////////////////////////////////////////////////////////////////////////////////////
// BASIC TYPE GUARDS
////////////////////////////////////////////////////////////////////////////////////////
//Type guards let TypeScript narrow down the type of a variable inside an if block.
// “smart”, it understands what the variable really is after the check so you can run code as if it will be true

// Common type guards
//typeof = primitives (string, number, boolean, etc.), typeof x === "string"
//instanceof = classes / objects, x instanceof Date
//'key' in obj = checking if key exists, 'age' in person

//JavaScript only figures out types while the code is running → this is called runtime.
// let x = 5;     // JS decides “ok, it’s a number” only now
// x = "hello";   // fine, JS allows it
//JS doesn’t know or care about types beforehand — it just reacts while running.
//JS learns types while running.

//TS checks types before running.
// this is compile time. It tries to prevent mistakes before the code even runs.
// let xs: number = 5;
// xs = "hello"; // error before you even run it

type Data = {
    name: string | number | Date;
    description?: string;
    priority: "high" | "medium" | "low";
  };
  
  function printData(data: Data) {
    if (typeof data.name === "string") {
        //TS: "Okay, since the code checked it, I’ll treat it as a string in this block"
      console.log(data.name.toUpperCase()); // TS knows it's string
    } else if (typeof data.name === "number") {
      console.log(data.name.toFixed(2)); // number
    } else if (data.name instanceof Date) {
      console.log(data.name.getFullYear()); //  Date
    }
      
    // const characters = data.description.length; //ERROR: 'data.description' is possibly 'undefined'.ts(18048)
    //can check forst if variable is true/exists since it's option
    if (data.description) {
        console.log(data.description.length);
    }
    console.log(data.description?.length); // description? check is the code after desription key is true
    //nice to check for null or undefined
    
    switch (data.priority) {
      case "high":
        console.log(data.priority.toUpperCase());
        break;
      case "medium":
        console.log(data.priority.length);
        break;
      case "low":
        console.log("Last one");
        break;
    }

  }

printData({ name: "Leticia", description: "devbr", priority: "high" });

//using ? in html elements
const inputElement = document.querySelector<HTMLInputElement>(".input");
console.log(inputElement?.value); //inputElement? checks if inputElement exists before accessing value
//without ? it would give error if element not found
//if you are sure the element exists, can use ! to tell TS that
const inputElement2 = document.querySelector<HTMLInputElement>(".input")!; //optional can insert ! here too
// console.log(inputElement2!.value); // ! tells TS that inputElement is not null or undefined
//not recommended unless you are sure bcs overrides TS safety check

//getElementById is not a generic function. cannot pass type information to it using <Type> syntax. 
// const todoForm = document.getElementById('new-todo-form') as HTMLFormElement

////////////////////////////////////////////////////////////////////////////////////////
//NEVER TYPE
////////////////////////////////////////////////////////////////////////////////////////
//never = a value that never exists or a function that never returns, code should not reach there
//useful for union types to make sure you checked all types in a union
function handlePriority(data: Pick<Data, "priority">) {
    switch (data.priority) {
      case "high": break;
      case "medium": break;
      case "low": break;
        default:
            const exaustiveCheck: never = data.priority; // ❌ error if you forgot a case
            console.log(exaustiveCheck); //it can be type nver bcs all cases are handled above, if not it will give error
  }

}
handlePriority({priority: "high"}); //can only set priority because of data: Pick<Data, "priority">

//Functions that never return, used for errors or infinite loops
function throwError(message: string): never {
  throw new Error(message); // never returns
}
function loopForever(): never {
  while (true) {}
}
//TypeScript knows: This function doesn’t end normally, it never produces a value.

////////////////////////////////////////////////////////////////////////////////////////
// UNKNOWN TYPE
////////////////////////////////////////////////////////////////////////////////////////
//unknown type is similar to :any but while amy can be any type, unknown has to be checked before using it
//unknown is safer than any bcs you have to check the type before using it, howeever need to do type assertion or type guard before using it
//use unknown when you dont know the type of a variable beforehand, like user input, API responses, etc
function func(data: unknown) {
    if (data != null && typeof data === "object" && "name" in data) {
        console.log(data.name); //only log data.name if data is an object and has name key
} 
}
//using unknown you force the code to know what it means , while with any it doesn't care what type it means

////////////////////////////////////////////////////////////////////////////////////////
// AS CASTING
////////////////////////////////////////////////////////////////////////////////////////
//Type assertions = telling TypeScript to treat a variable as a different type
//Casting is like telling TypeScript: “Trust me, I know what type this is.”
type TodoERandom = {
    id: number;
    title: string;
    completed: boolean;
  };
  
 fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
     .then((data) => {
        return data as TodoERandom;
     }).then((todo) => {
        console.log("Todo item:", todo.title);
     });
    
const asCating: any = 2;
(asCating as string).length;

////////////////////////////////////////////////////////////////////////////////////////
// SATISFIES
////////////////////////////////////////////////////////////////////////////////////////
//satisfies is used to checks that a value matches a given type without losing the more specific type definition you may already have.
type Userin = {
    id: string | number
    name: string
    age: number
  }
  
  const nuser = {
    id: 1,
    name: "Kyle",
    age: 28
  } satisfies Userin
//since Userin has id: string | number, setting satifies will treat id as number here
//if I did const user: Userin = { ... } then id would still be 'string | number' and I would not be able to do number operations on it directly
//it's like it gets satisfied that one type was already set correctly without losing the specific type
const newId = nuser.id + 1 // No errors

////////////////////////////////////////////////////////////////////////////////////////
// DISCRIMINATED UNIONS
////////////////////////////////////////////////////////////////////////////////////////
//Discriminated Unions = a pattern for combining union types and type guards to create more specific types.
//Combines multiple object types into one union type.
//Uses a common property (called the “discriminator”) to tell them apart.
//Each type in the union has a common property with a unique literal value.

type EmailNotification = {
    type: "email"; // <-- this is the discriminator
    subject: string;
    recipient: string;
  };
  
  type SMSNotification = {
    type: "sms"; // <-- discriminator again, 
    // always use string literals like "sms", not general types like string otherwisev won't work as discriminator
    phoneNumber: string;
    message: string;
  };

//Think of it like: “Give each object a name tag (type), and TypeScript will remember who’s who.
type Notifications = EmailNotification | SMSNotification; // union!
  
  function handleNotification(notification: Notifications) {
    if (notification.type === "email") {
      // TypeScript knows this is EmailNotification
      console.log("Email to:", notification.recipient);
      console.log("Subject:", notification.subject);
    } else {
      // TypeScript knows this is SMSNotification
      console.log("SMS to:", notification.phoneNumber);
      console.log("Message:", notification.message);
    }
  }
  

//another example with api response
//intead of 
type UserApiResponse = {
    status: "Error" | "Success",
    data?: { id: string; name: string },
    errorMessage?: string
}
//split into two types and use discriminated union
type SuccessResponse = {
    status: "Success",
    data: { id: string; name: string },
}
type ErrorResponse = {
    status: "Error",
    errorMessage: string
}
type UserApiResponse2 = SuccessResponse | ErrorResponse; //discriminated union

function handleResponse(res: UserApiResponse2) {
    if (res.status === "Success") {
        console.log(res.data.name);
    } else {
        console.log(res.errorMessage.length);
    }
}
handleResponse({status: "Error", errorMessage: "Not found"});
handleResponse({ status: "Success", data: { id: "1", name: "Leticia" } });

////////////////////////////////////////////////////////////////////////////////////////
// FUNCTION OVERLOADS
////////////////////////////////////////////////////////////////////////////////////////
//function overloading lets you define multiple signatures for a single function, so it can behave differently depending on the input types.
//"If you give me A, I’ll return B. If you give me X, I’ll return Y — all in one function."

// 1. Define multiple overloads (signatures) No logic in overloads only on implementation
function greet(person: string): string;
function greet(person: string[]): string;

// 2. Implement the function only once, The implementation must accept all overload types
function greet(person: string | string[]): string {
  if (Array.isArray(person)) {
    return `Hello, ${person.join(" and ")}`;
  } else {
    return `Hello, ${person}`;
  }
}
greet("Alice"); // "Hello, Alice"
greet(["Alice", "Bob"]); // "Hello, Alice and Bob"


//Real-World Example: Web3 Wallet Checker
type Wallet = { address: string };

function connect(wallet: Wallet): string;
function connect(wallets: Wallet[]): string;

function connect(walletOrWallets: Wallet | Wallet[]): string {
  if (Array.isArray(walletOrWallets)) {
    return `Connected ${walletOrWallets.length} wallets`;
  } else {
    return `Connected wallet at ${walletOrWallets.address}`;
  }
}

////////////////////////////////////////////////////////////////////////////////////////
// TYPE PREDICTATE FUNCTION
////////////////////////////////////////////////////////////////////////////////////////
//A type predicate tells TypeScript:
//“If this function returns true, you can trust me that this value is of a certain type.”
type Doggy = {
    late: string;
}
type Catty = {
    mia: string;
}

//type predicates works by defining a function that returns a boolean and using the syntax `parameterName is Type` in the return type.
//tell TS that if isDog returns true, pet is Dog
function isDog(pet: Doggy | Catty): pet is Doggy {
    return (pet as Doggy).late !== undefined; 
    //if returns true, pet is Dog the type will be narrowed to Dog
}

function handlePet(pet: Doggy | Catty) {
    if (isDog(pet)) {
        console.log(pet.late); // TS knows it's Dog
    } else {
        console.log((pet as Catty).mia); // TS knows it's Cat
    }
}
handlePet({ late: "Holf!" });

//another more real-world example with type predicate
// Define constant values for priority levels
const PRIORITIES = ["High", "Medium", "Low"] as const;

type Priority = (typeof PRIORITIES)[number]; // Create a union type from PRIORITIES → "High" | "Medium" | "Low"
type Todo_ = {
    title: string,
    description: string,
}

// Function that does something with a Todo
function foo(todo: Todo_) {
    // Check if the description is one of our valid PRIORITIES
    if (isPriority(todo.description)) {
        console.log(todo.description);
    } else {
        todo.description;
        // Otherwise, it's just some normal string (not a priority)
    }
}
//the actual Type Predicate Function
// Returns true if description is in the PRIORITIES array
// Cast 'description' as Priority for TS to avoid type mismatch inside includes()
function isPriority(description: string): description is Priority {
    return PRIORITIES.includes(description as Priority)
}