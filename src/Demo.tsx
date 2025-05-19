import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { addTodo, fetchTodos } from "./api"
import TodoCard from "./components/TodoCard";

const Demo = () => {
    // const {isLoading, error, data} = useQuery("repoData", () => {});
    const queryClient = useQueryClient();

    const [search, setSearch] = useState("");
    const [title, setTitle] = useState("");

    const {data: todos, isLoading} = useQuery({
        queryFn: () => fetchTodos(search),
        queryKey: ["todos", {search}],
        // catching withod re fetching
        // staleTime: Infinity, 
        // never catch data
        // cacheTime: 0 
    });

    const { mutateAsync: addTodoMutation } = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries(["todos"])
        }
    })

    if (isLoading) return <div>Loading...</div>

    return <div>
        <div>
            <input 
                type="text" 
                onChange={e => setTitle(e.target.value)} 
                value={title} 
            />
            <button onClick={async () => {
                try {
                    await addTodoMutation({title});
                    setTitle("");
                } catch (error) {
                    console.log(JSON.stringify(error))
                }
            }}>Add todo</button>
        </div>
        {todos?.map(todo => {
            return <TodoCard key={todo.id} todo={todo}/>
        })}
    </div>
}

export default Demo