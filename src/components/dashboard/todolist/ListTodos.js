import React, { Fragment, useState, useEffect } from 'react';
import EditTodo from './EditTodo';

const ListTodos = ({ allTodos, setTodosChange }) => {
	//set state for todos
	const [todos, setTodos] = useState([]);

	//delete todo 
	async function deleteTodo(id) {
		try {
			await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
				method: 'DELETE',
				headers: {token: localStorage.token}
			});

			setTodos(todos.filter(todo => todo.todo_id !== id));
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		setTodos(allTodos);
	}, [allTodos]);

	return (
		<Fragment>
			<table className="table mt-5">
				<thead>
					<tr>
						<th scope="col">description</th>
						<th scope="col">edit</th>
						<th scope="col">delete</th>
					</tr>
				</thead>
				<tbody>
					{
						todos.length !== 0 && todos[0].todo_id !== null &&
						todos.map(todo => (
							<tr key={todo.todo_id}>
								<td>{todo.description}</td>
								<td><EditTodo todo={todo} setTodosChange={setTodosChange}/></td>
								<td><button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>delete</button></td>
							</tr>
						))
					}
				</tbody>
			</table>
		</Fragment>
	);
};

export default ListTodos;