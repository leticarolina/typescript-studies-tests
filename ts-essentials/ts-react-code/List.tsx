type listProps<ItemType> = {
    items: ItemType[], //// array of that type
    getKey: (item: ItemType) => React.Key, // how to extract a key (id, index, etc.)
    renderItem: (item: ItemType) => React.ReactNode // how to render each item
}

//T is just a placeholder for the type of your list items. It could be User, Todo, Product, etc.

export function List<T>({items, getKey, renderItem}: listProps<T>) {
    return (
        <div>
            {items.map((item) => {
               return <div key={ getKey(item)}>{renderItem(item)} </div>
            })}
        </div>
    )
}


// import { List } from "../ts-react-code/List.tsx"
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

