import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterBar from './components/FilterBar';

//Fake data for now
const sampleTodos = [
    { id: '1', text: 'Learn React props', done: true, createdAt: Date.now() },
    { id: '2', text: 'Add state to the prop', done: false, createdAt: Date.now() },
    { id: '3', text: 'Deploy to a server', done: false, createdAt: Date.now() },
]

export default function App(){
    const [todos, setTodos] = useLocalStorage('todos', sampleTodos)
    const [filter, setFilter] = useState("all")

    // Flip done/not-done for one todo
    function toggleTodo(id){
        setTodos((prev) =>
        prev.map((todo) => 
        todo.id === id ? {...todo, done: !todo.done} : todo
        )
    )}

    // Replace the text of one todo
    function editTodo(id, newText){
        setTodos((prev)=>
        prev.map((todo) =>
        todo.id === id ? {...todo, text: newText} : todo
        )
    )}
    
    function addTodo(text){
        const newTodo = {
            id: crypto.randomUUID(),
            text,
            done: false,
            createdAt: Date.now(),
        }
        setTodos((prev) => [...prev, newTodo])
    }

    function deleteTodo(id){
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
    }

    function clearCompleted(){
        setTodos((prev) => prev.filter((todo) => !todo.done))
    }

    const visibleTodos = todos.filter((todo) => {
        if(filter === "active") return !todo.done
        if(filter === 'completed') return todo.done
        return true // 'all'
    })

    const itemsLeft = sampleTodos.filter((todo) => !todo.done).length
    const hasCompleted = todos.some((todo) => todo.done)

    const emptyMessages = {
        all: "Nothing to do.",
        active: "No active todos, nice work!",
        complted: "Nothing completed yet."
    }

    return (
        <main className="app">
            <h1>Todos</h1>
            <TodoForm onAdd={addTodo}/>
            <TodoList
                todos={visibleTodos}
                emptyMessages={emptyMessages[filter]}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={deleteTodo} />
            

            <FilterBar
                itemsLeft={itemsLeft}
                filter={filter}
                onFilterChange={setFilter}
                hasCompleted={hasCompleted}
                onClearCompleted={clearCompleted} />
        </main>
    )
}