// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { toggleCompleteAsync, deleteTodoAsync } from '../redux/todoSlice';

// const TodoItem = ({ id, title, completed, dueDate }) => {
// 	const dispatch = useDispatch();

// 	const handleCheckboxClick = () => {
// 		dispatch(toggleCompleteAsync({ id, completed: !completed }));
// 	};

// 	const handleDeleteClick = () => {
// 		dispatch(deleteTodoAsync({ id }));
// 	};

// 	return (
// 		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
// 			<div className='d-flex justify-content-between align-items-center'>
// 				<div>
// 					<input
// 						type='checkbox'
// 						className='mr-3'
// 						checked={completed}
// 						onChange={handleCheckboxClick}
// 					/>
// 					<span>{title}</span>
// 					{dueDate && (
// 						<small className='text-muted ml-3'>
// 							(Due: {new Date(dueDate).toLocaleDateString()})
// 						</small>
// 					)}
// 				</div>
// 				<button onClick={handleDeleteClick} className='btn btn-danger'>
// 					Delete
// 				</button>
// 			</div>
// 		</li>
// 	);
// };

// export default TodoItem;

// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { toggleCompleteAsync, deleteTodoAsync } from '../redux/todoSlice';

// const TodoItem = ({ id, title, dueDate, completed }) => {
// 	const dispatch = useDispatch();

// 	const handleCheckboxClick = () => {
// 		dispatch(toggleCompleteAsync({ id, completed: !completed }));
// 	};

// 	const handleDeleteClick = () => {
// 		dispatch(deleteTodoAsync({ id }));
// 	};

// 	return (
// 		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
// 			<div className='d-flex justify-content-between align-items-center'>
// 				<span>
// 					<input
// 						type='checkbox'
// 						className='mr-2'
// 						checked={completed}
// 						onChange={handleCheckboxClick}
// 					/>
// 					<strong>{title}</strong>
// 					{dueDate && (
// 						<span className='ml-3 text-muted'>
// 							(Due: {new Date(dueDate).toLocaleDateString()})
// 						</span>
// 					)}
// 				</span>
// 				<button onClick={handleDeleteClick} className='btn btn-danger'>
// 					Delete
// 				</button>
// 			</div>
// 		</li>
// 	);
// };

// export default TodoItem;
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteAsync, deleteTodoAsync } from '../redux/todoSlice';

const TodoItem = ({ id, title, dueDate, completed }) => {
	const dispatch = useDispatch();

	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between align-items-center'>
				<span>
					<input
						type='checkbox'
						checked={completed}
						onChange={() => dispatch(toggleCompleteAsync({ id, completed: !completed }))}
						className='mr-2'
					/>
					<strong>{title}</strong>
					{dueDate && <span className='ml-3 text-muted'>(Due: {new Date(dueDate).toLocaleDateString()})</span>}
				</span>
				<button onClick={() => dispatch(deleteTodoAsync({ id }))} className='btn btn-danger'>
					Delete
				</button>
			</div>
		</li>
	);
};

export default TodoItem;
