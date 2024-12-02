// utils/localStorage.js

export const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('todos', serializedState); // Store in localStorage
    } catch (e) {
        console.error("Could not save state to localStorage", e);
    }
};

export const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('todos');
        if (serializedState === null) {
            return []; // Return an empty array if no todos are saved
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("Could not load state from localStorage", e);
        return []; // Return an empty array on error
    }
};
