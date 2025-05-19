interface Todo {
        id: number,
        title: string,
        completed: boolean
    }

const TodoCard = (todo: Todo) => {
    return <div>{JSON.stringify(todo)}</div>
}

export default TodoCard;