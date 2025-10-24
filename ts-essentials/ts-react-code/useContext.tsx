import {useUsers} from "../src/App.tsx";

export function Child() {
    const { users } = useUsers();

    return (
        <ul>
            {users.map((user) => {
                return <li>{user.name}</li>
            })}
        </ul>
    )
}