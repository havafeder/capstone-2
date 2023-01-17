import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<div className="jumbotron mt-5">
			<h1>welcome to TO-DO</h1>
			<p>it's time to be productive</p>
			<p>login or register to start building your to-do list!</p>
			<Link to='/login' className='btn btn-primary'>login</Link>
			<Link to='/register' className='btn btn-primary ml-3'>register</Link>
		</div>
	);
};

export default Home;
