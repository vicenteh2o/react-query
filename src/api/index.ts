import type { Todo } from "../entities/Todo"
 
const todos = [
    {
        id:1,
        title: "Aprende HTML",
        completed: false
    },
    {
        id:2,
        title: "Aprende CSS",
        completed: false
    },
    {
        id:3,
        title: "Aprende Javascript",
        completed: false
    },
    {
        id:4,
        title: "Aprende React",
        completed: false
    },
    {
        id:5,
        title: "Aprende Next.js",
        completed: false
    }
]

export const fetchTodos = async (query = ""): Promise<Todo[]> => {
    await new Promise(resolve => setTimeout(resolve,1000))

    console.log("fetches todos")

    const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(query.toLocaleLowerCase()))

    return [...filteredTodos]
}

export const addTodo = async (todo: Pick<Todo, "title">): Promise<Todo> => {
    await new Promise(resolve => setTimeout(resolve,1000));

    const newTodo = {
        id: todos.length + 1,
        title:todo.title,
        completed: false
    }

    todos.push(newTodo);

    return newTodo;
}