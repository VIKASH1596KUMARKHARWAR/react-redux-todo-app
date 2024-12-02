import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../redux/todoSlice';

const AddTodoForm = () => {
	const [title, setTitle] = useState('');
	const [dueDate, setDueDate] = useState('');
	const dispatch = useDispatch();

	const onSubmit = (event) => {
		event.preventDefault();
		if (title && dueDate) {
			dispatch(
				addTodoAsync({
					title,
					dueDate,
				})
			);
			setTitle('');
			setDueDate('');
		}
	};

	return (
		<form onSubmit={onSubmit} className='form-inline mt-3 mb-3'>
			<div className='form-group mb-2 mr-sm-2'>
				<label htmlFor='todoTitle' className='sr-only'>Todo</label>
				<input
					type='text'
					id='todoTitle'
					className='form-control'
					placeholder='Add todo...'
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
			</div>

			<div className='form-group mb-2 mr-sm-2'>
				<label htmlFor='todoDueDate' className='sr-only'>Due Date</label>
				<input
					type='date'
					id='todoDueDate'
					className='form-control'
					value={dueDate}
					onChange={(event) => setDueDate(event.target.value)}
				/>
			</div>

			<button type='submit' className='btn btn-primary mb-2'>
				Submit
			</button>
		</form>
	);
};

export default AddTodoForm;
