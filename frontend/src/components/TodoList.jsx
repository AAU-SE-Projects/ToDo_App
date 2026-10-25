import TodoItem from './TodoItem';

export default function TodoList({ todos, onDelete }){
    // Show a message insteaf of an empty list
    if(todos.length === 0){
        return <p className='empty'>Nothing to do</p>
    }

    return (
        <ul className='todo-list'>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onToggle={onToggle} />
            ))}
        </ul>
    )
}