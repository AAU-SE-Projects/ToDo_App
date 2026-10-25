import { useState } from 'react';
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
    const [todos, setTodos] = useState(sampleTodos)

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

    const itemsLeft = sampleTodos.filter((todo) => !todo.done).length

    return (
        <main className="app">
            <h1>Todos</h1>
            <TodoForm />
            <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={deleteTodo} />
            <FilterBar itemsLeft={itemsLeft} />
        </main>
    )
}