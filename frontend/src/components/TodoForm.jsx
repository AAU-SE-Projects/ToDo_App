import { useState } from 'react';

export default function TodoForm({ onAdd }) {
    const [text, setText] = useState('')
    
    function handleSubmit(event){
        event.preventDefault()

        const trimmed = text.trim()
        if(!trimmed) return // Ignore whitespace only or empty inputs

        onAdd(trimmed) // Ask App to add it
        setText('') // Clear input for next todo
    }

    return (
        // A real <form> means pressing Enter submits
        <form className="todo-form" on onSubmit={handleSubmit}>
            <label htmlFor="new-todo" className="visually-hidden">New todo</label>
            <input type="text"
                id="new-todo"
                value={text} // Show the state
                onChange={(event) => setText(event.target.value)} // Update it on every keystroke
                placeholder="What needs doing?"/>
            <button type="submit">Add</button>
        </form>
    )
}