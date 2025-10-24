import { useReducer} from "react";
type State = {
    count: number;
};
  
//Define actions
// Union type: either an increment action or a decrement action
type Action = {
    type: "increment";
    increaseBy: number;

} | {
    type: "decrement";
    decreaseBy: number;
}
// This function takes the current state and an action, and returns the new state
function reducer(state : State, action: Action ) {
    switch (action.type) {
        case "increment":
            // TypeScript knows action has "increaseBy" here
            return { ...state, count: state.count + action.increaseBy };
        case "decrement":
            return { ...state, count: state.count - action.decreaseBy };
        default:
            return state;// fallback, never happens if all actions are handled
    }
}
export default function App() {
    // useReducer returns state and dispatch function
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    return (
        <>
         <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: "increment", increaseBy: 1 })}>Increment</button>
            <button onClick={() => dispatch({ type: "decrement", decreaseBy: 1 })}>Decrement</button>
         </div>
        </>  
    );
}