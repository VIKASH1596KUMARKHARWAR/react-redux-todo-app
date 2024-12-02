// import React from 'react';
// import { useSelector } from 'react-redux';

// const TotalCompleteItems = () => {
// 	// Select and filter completed todos from the Redux state
// 	const completedTodosCount = useSelector((state) =>
// 		state.todos.filter((todo) => todo.completed).length
// 	);

// 	return <h4 className='mt-3'>Total complete items: {completedTodosCount}</h4>;
// };

// export default TotalCompleteItems;
import React from 'react';
import { useSelector } from 'react-redux';

const TotalCompleteItems = () => {
	// Access the tasks array within `state.todos.items`
	const completedTodos = useSelector((state) =>
		state.todos.items.filter((todo) => todo.completed === true)
	);

	return <h4 className='mt-3'>Total complete items: {completedTodos.length}</h4>;
};

export default TotalCompleteItems;
