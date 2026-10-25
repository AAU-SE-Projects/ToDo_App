import { useState, useEffect } from 'react';

// Works exactly like useState, but also saves the value to localStorage.
// key = the name it's stored under, intialValue = used if nothing is saved yet
export function useLocalStorage(key, initialValue){
    // passing a FUNCTION to useState means it only runs on the first render
    // (a "lazy initializer"). Reading localStorage on every render would be wasteful
    const [value, setValue] = useState(() => {
        try {
            const saved = localStorage.getItem(key) // Returns a string, or null if missing
            // localStorage can only store strings, so turn the string back into an array/object
            return saved !== null ? JSON.parse(saved) : initialValue
        } catch {
            // Corrupted data or storage blocked (e.g. some private modes): start fresh
            return initialValue
        }
    })

    // Runs after every render where `value` (or `key`) changed
    useEffect(() => {
        try {
            // Turn the array/object into a string so localStorage can store it
            localStorage.setItem(key, JSON.stringify(value))
        } catch {
            // Storage full or blocked, the app still works, it wont remember
        }
    }, [key, value]) // The dependency list: only re-run when these change

    // return the same [value, setter] pair that useState gives
    return [value, setValue]
}