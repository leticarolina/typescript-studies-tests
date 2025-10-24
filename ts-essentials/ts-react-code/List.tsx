type listProps<ItemType> = {
    items: ItemType[],
    getKey: (item: ItemType) => React.Key,
    renderItem: (item: ItemType) => React.ReactNode
}

export function List<T>({items, getKey, renderItem}: listProps<T>) {
    return (
        <div>
            {items.map((item) => {
               return <div key={ getKey(item)}>{renderItem(item)} </div>
            })}
        </div>
    )
}