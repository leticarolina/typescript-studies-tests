import type { ReactNode } from "react";

type ChildProps = {
    name: string;
    age: number;
    children: ReactNode; //ReactNode allows any valid React child (string, number, element, fragment, etc)
};

//TypeScript doesn’t allow type annotations inside destructuring like that
//export default function Card({ name: string, age: number }) {
//Option 1 — inline right after the param
//export default function Card({ name, age }: { name: string; age: number }) 
//Option 2 — define a type or interface (recommended)
export default function Card({ name, age, children }: ChildProps) {
    return (
        <div>
            <p>name: {name} </p>
            <p>Age: {age}</p>
            <p>age in 10 years: {age + 10}</p>
         {children}
        </div>
    );
}

//app tsx file usage
// import Card from "./components/Card.tsx";

// export default function App() {
//   return (
//     <div>
//       <h1>Parent Component</h1>
//       <Card name="Letícia" age={27} />
//     </div>
//   );
// }
