export default function App() {
  type Stats = { name: string } & { age: number };
  function justPrint(obj: Stats) {
    return obj;
  }
  console.log(justPrint({ name: "leticia", age: 1997 }))

  type ContactInfo = { email: string; phone?: string };
  type Employee = { id: number; name: string };
  type EmployeeContact = ContactInfo & Employee;
  function sendWelcomeEmail(obj: EmployeeContact) {
    return console.log(`Welcome, ${obj.name}! Email sent to ${obj.email}.`);
  }
  sendWelcomeEmail({ id: 1, email: "leticiac@email.com", name: "Leticia" })
  
  type Cat = { type: "cat"; meow: () => void };
  type Dog = { type: "dog"; bark: () => void };
  type Pet = (Cat | Dog) & { age: number};
  function describePet(pet: Pet) {
    return `${pet.type}, ${pet.age}`;
  }
  console.log(describePet({ age: 7, type: "cat", meow: () => console.log("meow!")}));
  console.log(describePet({ type: "dog", age: 5, bark: () => console.log("bark!") })); 

   


  return (
    <>
    </>
  )

}

