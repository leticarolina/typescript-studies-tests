import type { ComponentProps } from "react";

//component props typing in TypeScript is when you’re building reusable UI components (like buttons, inputs, modals, etc.) that need to pass through HTML attributes 
// e.g. onClick, disabled, type, etc

// Extend native button props
type ButtonProps = {
  variant?: "primary" | "secondary"; // your custom prop
} & ComponentProps<"button">;
//instead of "button" I could also pass a custom component like <typeof "Card">

// Define the component
export default function Button({
  variant = "primary",
  children,
  ...rest
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? { backgroundColor: "purple", color: "white" }
      : { backgroundColor: "lightgray", color: "black" };

  // Spread ...rest to allow native props (like onClick, disabled)
  return (
    <button style={styles} {...rest}>
      {children}
    </button>
  );
}



//on app.tsx
// import Button from "../ts-react-code/Button.tsx";

// export default function App() {
//     console.log('hi');
//     return (
//         <>
//          <div>
//            <Button onClick={() => alert("Clicked!")} variant="primary">
//             Click Me
//            </Button>
//            <Button disabled variant="secondary">
//             Disabled
//            </Button>
//          </div>
//         </>
        
//     );
// }