import React, { Fragment, useState } from 'react';

const TodoEdit = ({ todo, setTodosChange }) => {
	//edit todo 
	const editText = async (id) => {
		try {
			const body = { description }

			const myHeaders = new Headers();

			myHeaders.append('Content-Type', 'application/json');
			myHeaders.append('token', localStorage.token);

			await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
				method: 'PUT',
				headers: myHeaders,
				body: JSON.stringify(body)
			});

			setTodosChange(true);
		} catch (err) {
			console.error(err.message);
		}
	}

	const [description, setDescription] = useState(todo.description);

	return (
		<Fragment>
			<button type="button"
				className="btn btn-warning"
				data-toggle="modal"
				data-target={`#id${todo.todo_id}`}>
				edit
			</button>

			<div className="modal" id={`id${todo.todo_id}`}
				onChange={e => setDescription(e.target.value)}>
				<div className="modal-dialog">
					<div class="modal-content">

						<div class="modal-header">
							<h4 class="modal-title">edit todo</h4>
							<button type="button"
								class="close"
								onClick={() => setDescription(todo.description)}
								data-dismiss="modal">&times;</button>
						</div>

						<div class="modal-body">
							<input type="text"
								className='form-control'
								value={description}
								onChange={e => setDescription(e.target.value)} />
						</div>

						<div class="modal-footer">
							<button type="button"
								class="btn btn-warning"
								data-dismiss="modal"
								onClick={() => editText(todo.todo_id)}>
								edit</button>
						</div>
						<div class="modal-footer">
							<button type="button"
								class="btn btn-danger"
								onClick={() => setDescription(todo.description)}
								data-dismiss="modal">close</button>
						</div>

					</div>
				</div>
			</div>
		</Fragment>

	)
}

export default TodoEdit;
