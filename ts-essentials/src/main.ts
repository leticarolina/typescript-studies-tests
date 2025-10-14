////////////////////////////////////////////////////////////////////////////////////////
// AS CONST AND ENUS
////////////////////////////////////////////////////////////////////////////////////////
const a = 1; //type is 1 - hardcoded
let b = 1; //type is number
let c = 1 as const; //type is 1 - as const means treat as constant never change

const nums = ["one","two" ,"tree"] as const; //const nums: readonly [1, 2, 3]
const first = nums[0]; //const first: "one"
console.log(first); //one

//using Enums
const SKILL_LEVELS = ["begginer", "intermediate", "Expert"] as const; //type is literal values readonly ["begginer", "intermediate", "Expert"]
type Person = {
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

type Tuple = [string, boolean];
const combine: Tuple = ['first', true];