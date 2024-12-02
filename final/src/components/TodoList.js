// import React, { useEffect } from 'react';
// import TodoItem from './TodoItem';
// import { useSelector, useDispatch } from 'react-redux';
// import { getTodosAsync } from '../redux/todoSlice';

// const TodoList = () => {
// 	const dispatch = useDispatch();
// 	const todos = useSelector((state) => state.todos);

// 	useEffect(() => {
// 		dispatch(getTodosAsync());
// 	}, [dispatch]);

// 	return (
// 		<ul className='list-group'>
// 			{todos.map((todo) => (
// 				<TodoItem
// 					key={todo.id} // Added key to resolve warning
// 					id={todo.id}
// 					title={todo.title}
// 					completed={todo.completed}
// 					dueDate={todo.dueDate} // Added dueDate prop
// 				/>
// 			))}
// 		</ul>
// 	);
// };

// // export default TodoList;
// import React, { useEffect, useState } from 'react';
// import TodoItem from './TodoItem';
// import { useSelector, useDispatch } from 'react-redux';
// import { getTodosAsync } from '../redux/todoSlice';

// const TodoList = () => {
// 	const dispatch = useDispatch();
// 	const todos = useSelector((state) => state.todos);
// 	const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending', 'overdue'

// 	useEffect(() => {
// 		dispatch(getTodosAsync());
// 	}, [dispatch]);

// 	// Filtered todos based on the selected filter
// 	const filteredTodos = todos.filter((todo) => {
// 		if (filter === 'completed') return todo.completed;
// 		if (filter === 'pending') return !todo.completed;
// 		if (filter === 'overdue') {
// 			const dueDate = new Date(todo.dueDate);
// 			const currentDate = new Date();
// 			return !todo.completed && dueDate < currentDate;
// 		}
// 		return true; // 'all'
// 	});

// 	return (
// 		<div>
// 			<div className='mb-3'>
// 				<label htmlFor='filter'>Filter Tasks:</label>
// 				<select
// 					id='filter'
// 					className='form-control'
// 					value={filter}
// 					onChange={(e) => setFilter(e.target.value)}
// 				>
// 					<option value='all'>All Tasks</option>
// 					<option value='completed'>Completed Tasks</option>
// 					<option value='pending'>Pending Tasks</option>
// 					<option value='overdue'>Overdue Tasks</option>
// 				</select>
// 			</div>
// 			<ul className='list-group'>
// 				{filteredTodos.map((todo) => (
// 					<TodoItem
// 						key={todo.id}
// 						id={todo.id}
// 						title={todo.title}
// 						dueDate={todo.dueDate}
// 						completed={todo.completed}
// 					/>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// export default TodoList;
import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getTodosAsync, setFilter } from '../redux/todoSlice';

const TodoList = () => {
	const dispatch = useDispatch();
	const { items: todos, filter } = useSelector((state) => state.todos);

	useEffect(() => {
		dispatch(getTodosAsync());
	}, [dispatch]);

	// Apply filter
	const filteredTodos = todos.filter((todo) => {
		if (filter === 'completed') return todo.completed;
		if (filter === 'pending') return !todo.completed;
		if (filter === 'overdue') {
			const dueDate = new Date(todo.dueDate);
			return !todo.completed && dueDate < new Date();
		}
		return true; // 'all'
	});

	return (
		<div>
			<div className='mb-3'>
				<label htmlFor='filter'>Filter Tasks:</label>
				<select
					id='filter'
					className='form-control'
					value={filter}
					onChange={(e) => dispatch(setFilter(e.target.value))}
				>
					<option value='all'>All Tasks</option>
					<option value='completed'>Completed Tasks</option>
					<option value='pending'>Pending Tasks</option>
					<option value='overdue'>Overdue Tasks</option>
				</select>
			</div>
			<ul className='list-group'>
				{filteredTodos.map((todo) => (
					<TodoItem
						key={todo.id}
						id={todo.id}
						title={todo.title}
						dueDate={todo.dueDate}
						completed={todo.completed}
					/>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
