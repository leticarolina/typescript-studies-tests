////////////////////////////////////////////////////////////////////////////////////////
// DEBUGGING
////////////////////////////////////////////////////////////////////////////////////////
/*
TypeScript errors “expand” all the nested objects and generics,
so the real cause is often hidden deep in the message.
The bottom (last lines) usually tell the actual problem.
*/

// @ts-ignore
someBrokenCode();
//Tells TypeScript: “ignore the next line completely.”
//No error, no warning.Dangerous bcs it silences everything, even real bugs. Use only for temporary fixes.

// @ts-expect-error
someBrokenCode();
//Tells TS: “I know this line has an error, that’s expected.”
//If the error ever disappears (you fix the code later),
//TypeScript will warn you that the expect-error is no longer needed. 

////////////////////////////////////////////////////////////////////////////////////////
// IMPORT TYPES
////////////////////////////////////////////////////////////////////////////////////////
// export type Personn = { name: string, age: number, address: (string | number)[] };//need to set array keys type

import type { Personn } from "./1basicTypes.ts";

const newUser: Personn = { name: "Letícia", age: 27, address: [10] };

//import type tells TS you’re only importing a type, not real JS code —
//this disappears at runtime (it’s just for compile-time checking).

////////////////////////////////////////////////////////////////////////////////////////
// DECLARATION FILES
////////////////////////////////////////////////////////////////////////////////////////
//They’re files ending with .d.ts that hold type definitions only, no real code, just type info for TypeScript.
// math.d.ts
declare function sum(a: number, b: number): number;
