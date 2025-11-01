import { useState } from "react";

export default function App() {
    const [stringValue, setStringValue] = useState(""); //deafault value HAS to be a string
    const [value, setValue] = useState<string>(); //deafault is undefined | string - empty() will give undefined type
    const [arrayValue, setArrayValue] = useState<number[]>(); //const arrayValue: number[] | undefined
    // const [arrayValues, setArrayValues] = useState([]); //nope, array gets type of never[] but need a type of the array like number, string...
    // same with objects and arrays, type 'never' it forces the developer to manually pass the generic type
  
    return (
        <>
         <div>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />  
            <input type="text" onChange={() => setArrayValue([1,2,3])}/>  
         </div>
        </>
        
    );
}