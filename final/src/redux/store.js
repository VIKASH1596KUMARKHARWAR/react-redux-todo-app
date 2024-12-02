import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const persistedState = loadFromLocalStorage() || { items: [], filter: 'all' };

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: persistedState, // Load state from localStorage
});

store.subscribe(() => {
  saveToLocalStorage(store.getState().todos); // Save todos state to localStorage on every change
});

export default store;
