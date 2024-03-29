import React, { Fragment, useState } from 'react';

const MakeTodo = ({setTodosChange}) => {
	const [description, setDescription] = useState('');

	const onSubmitForm = async e => {
		e.preventDefault();
		try {

			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("token", localStorage.token);

			const body = { description };

			const response = await fetch('http://localhost:5000/dashboard/todos', {
				method: 'POST',
				headers: myHeaders,
				body: JSON.stringify(body)
			});

			const parseRes = await response.json();
			console.log(parseRes);
			
			setTodosChange(true);
			setDescription('');
		} catch (err) {
			console.error(err.message);
		}
	}

	return (
		<Fragment>
			<h1 className='text-center my-5'>what you gotta do?</h1>
			<form className='d-flex' onSubmit={onSubmitForm}>
				<input type="text" placeholder="add todo"
					className="form-control"
					value={description}
					onChange={e => setDescription(e.target.value)} />
				<button className='btn btn-success'>add</button>
			</form>
		</Fragment>
	)
}

export default MakeTodo;
