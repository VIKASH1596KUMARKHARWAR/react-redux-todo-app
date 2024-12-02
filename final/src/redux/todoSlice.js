// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';

// export const getTodosAsync = createAsyncThunk(
// 	'todos/getTodosAsync',
// 	async () => {
// 		const resp = await fetch('http://localhost:7000/todos');
// 		if (resp.ok) {
// 			const todos = await resp.json();
// 			return { todos };
// 		}
// 	}
// );

// export const addTodoAsync = createAsyncThunk(
// 	'todos/addTodoAsync',
// 	async (payload) => {
// 		const resp = await fetch('http://localhost:7000/todos', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ title: payload.title, dueDate: payload.dueDate }),
// 		});

// 		if (resp.ok) {
// 			const todo = await resp.json();
// 			return { todo };
// 		}
// 	}
// );

// export const toggleCompleteAsync = createAsyncThunk(
// 	'todos/completeTodoAsync',
// 	async (payload) => {
// 		const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
// 			method: 'PATCH',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ completed: payload.completed }),
// 		});

// 		if (resp.ok) {
// 			const todo = await resp.json();
// 			return { todo };
// 		}
// 	}
// );

// export const deleteTodoAsync = createAsyncThunk(
// 	'todos/deleteTodoAsync',
// 	async (payload) => {
// 		const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
// 			method: 'DELETE',
// 		});

// 		if (resp.ok) {
// 			return { id: payload.id };
// 		}
// 	}
// );

// export const todoSlice = createSlice({
// 	name: 'todos',
// 	initialState: [],
// 	reducers: {
// 		addTodo: (state, action) => {
// 			const todo = {
// 				id: nanoid(),
// 				title: action.payload.title,
// 				dueDate: action.payload.dueDate,
// 				completed: false,
// 			};
// 			state.push(todo);
// 		},
// 		toggleComplete: (state, action) => {
// 			const index = state.findIndex((todo) => todo.id === action.payload.id);
// 			state[index].completed = action.payload.completed;
// 		},
// 		deleteTodo: (state, action) => {
// 			return state.filter((todo) => todo.id !== action.payload.id);
// 		},
// 	},
// 	extraReducers: {
// 		[getTodosAsync.fulfilled]: (state, action) => {
// 			return action.payload.todos;
// 		},
// 		[addTodoAsync.fulfilled]: (state, action) => {
// 			state.push(action.payload.todo);
// 		},
// 		[toggleCompleteAsync.fulfilled]: (state, action) => {
// 			const index = state.findIndex(
// 				(todo) => todo.id === action.payload.todo.id
// 			);
// 			state[index].completed = action.payload.todo.completed;
// 		},
// 		[deleteTodoAsync.fulfilled]: (state, action) => {
// 			return state.filter((todo) => todo.id !== action.payload.id);
// 		},
// 	},
// });

// export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;

// export default todoSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async actions for CRUD operations
export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
	const response = await fetch('http://localhost:7000/todos');
	if (response.ok) {
		const todos = await response.json();
		return { todos };
	}
});

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (payload) => {
	const response = await fetch('http://localhost:7000/todos', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});
	if (response.ok) {
		const todo = await response.json();
		return { todo };
	}
});

export const toggleCompleteAsync = createAsyncThunk('todos/toggleCompleteAsync', async (payload) => {
	const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ completed: payload.completed }),
	});
	if (response.ok) {
		const todo = await response.json();
		return { todo };
	}
});

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodoAsync', async (payload) => {
	const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
		method: 'DELETE',
	});
	if (response.ok) {
		return { id: payload.id };
	}
});

// Slice definition
const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		items: [],
		filter: 'all', // Filters: 'all', 'completed', 'pending', 'overdue'
	},
	reducers: {
		setFilter: (state, action) => {
			state.filter = action.payload;
		},
	},
	extraReducers: {
		[getTodosAsync.fulfilled]: (state, action) => {
			state.items = action.payload.todos;
		},
		[addTodoAsync.fulfilled]: (state, action) => {
			state.items.push(action.payload.todo);
		},
		[toggleCompleteAsync.fulfilled]: (state, action) => {
			const index = state.items.findIndex((todo) => todo.id === action.payload.todo.id);
			state.items[index].completed = action.payload.todo.completed;
		},
		[deleteTodoAsync.fulfilled]: (state, action) => {
			state.items = state.items.filter((todo) => todo.id !== action.payload.id);
		},
	},
});

export const { setFilter } = todoSlice.actions;
export default todoSlice.reducer;
