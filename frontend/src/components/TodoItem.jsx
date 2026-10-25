import { useState, useRef } from 'react'

export default function TodoItem({ todo, onDelete, onEdit, onToggle }){
    // Is this row showing an input (editing) or plain text?
    const [isEditing, setIsEditing] = useState(false)

    // The text being typed while editing. Kept seperate from todo.text, so we can throw it away if the user presses Escape.
    const [draft, setDraft] = useState(todo.text)

    // A ref holds a value that survives re-renders but does NOT cause one.
    // Use it to remember "Thes user pressed Escape" until blur runs.
    const cancelledRef = useRef(false)

    function startEditing(){
        setDraft(todo.text) // Start from the current text
        setIsEditing(true)
    }

    // All three ways of editing edit mode (Enter, Escape, clicking away)
    // End up here, so the logic lives in one place
    function handleBlue(){
        setIsEditing(false)

        if(cancelledRef.current){
            cancelledRef.current = false
            return
        }

        const trimmed = draft.trim()
        if(!trimmed){
            
        }
    }
    
    return(
        <li className={todo.done ? 'todo-item done' : 'todo-item'}>
            <input type="checkbox" checked={todo.done} readOnly />
            <span className="todo-text">{todo.text}</span>
            <button className="delete"
                aria-label={`Delete ${todo.text}`}
                onClick={() => onDelete(todo.id)}
                >
                    ✕
                </button>
        </li>
    )
}