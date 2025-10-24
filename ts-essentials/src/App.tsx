import { List } from "../ts-react-code/List.tsx"

export default function App() {
   
    return (
        <List items={[
              { id: 1, name: "Leticia" , year: 1997},
              { id: 2, name: "Fernanda" },
            ]}
            getKey={item => item.id}
            renderItem={item => <div>{item.name}</div>}>
            
      </List>
    )
}

