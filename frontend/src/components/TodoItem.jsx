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
    function handleBlur(){
        setIsEditing(false)

        if(cancelledRef.current){
            cancelledRef.current = false
            return
        }

        const trimmed = draft.trim()
        if(!trimmed){
            onDelete(todo.id)
        } else if(trimmed !== todo.text){
            onEdit(todo.id, trimmed)
        }
    }

    function handleKeyDown(event){
        if(event.key === "Enter"){
            event.currentTarget.blur() // Leaving ht input triggers handleBlur => save
        }
        if(event.key === "Escape"){
            cancelledRef.current = true // Tell handleBlur not to save
            event.currentTarget.blur()
        }
    }

    // Edit mode: Show an inpuyt instead of the text
    if(isEditing){
        return(
            <li className="todo-item editing">
                <input className="edit-input"
                    aria-label='edit todo'
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            </li>
        )
    }

    // Normal mode
    return(
        <li className={todo.done ? 'todo-item done' : 'todo-item'}>
            <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
                aria-label={`Mark "${todo.text}" as ${todo.done ? "not done" : "done"}`}
            />
            
            <span className="todo-text" onDoubleClick={startEditing}>
                {todo.text}
            </span>
            
            <button
                className="edit"
                aria-label={`Edit ${todo.text}`}
                onClick={startEditing}
            >
                ✎
            </button>
            
            <button
                className="delete"
                aria-label={`Delete ${todo.text}`}
                onClick={() => onDelete(todo.id)}
            >
                ✕
            </button>
        </li>
    )
}