import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({setAuth}) => {

	//set state for inputs
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
		name: ""
	});

	//destructure inputs
	const { email, password, name } = inputs;

	//change state when value changes
	const onChange = (e) => {
		setInputs({ ...inputs, [e.target.name]: e.target.value })
	};

	//function to submit form to api to get jwt token
	const onSubmitForm = async (e) => {
		e.preventDefault();

		const body = { email, password, name };

		try {
			const response = await fetch('http://localhost:5000/auth/register',
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(body)
				});
			
			const parseRes = await response.json();

			localStorage.setItem('token', parseRes.token);

			setAuth(true);
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<Fragment>
			<h1 className='text-center my-5'>Register</h1>
			<form onSubmit={onSubmitForm}>
				<input
					type="email"
					name="email"
					placeholder="email"
					className='form-control my-3'
					value={email}
					onChange={e => onChange(e)}/>
				<input
					type="password"
					name="password"
					placeholder="password"
					className='form-control my-3'
					value={password}
					onChange={e => onChange(e)}/>
				<input
					type="text"
					name="name"
					placeholder="name"
					className='form-control my-3'
					value={name}
					onChange={e => onChange(e)}/>
				<button className='btn btn-success btn-block'>Submit</button>
			</form>
			<Link to='/login'>Login</Link>
		</Fragment>
	)
};

export default Register;