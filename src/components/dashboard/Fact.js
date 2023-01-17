import React, { Fragment, useState, useEffect } from 'react'; 

const Fact = () => {
	const [fact, setFact] = useState('');
	async function getFact(){
		try {

			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("X-API-Key", 'YEX5+9Cif8M7mM1DZTSDCA==kpfIQUeT1duH6w40');
			const response = await fetch('http://localhost:5000/dashboard/fact', {
				method: 'GET',
				headers: myHeaders
			});

			let parseRes = await response.json();
			setFact(parseRes);
		} catch (err) {
			console.error(err.message);
		}
	}

	useEffect(() => {
		getFact();
	}, []);

	return (
		<Fragment>
			<div>
				{fact}
			</div>
		</Fragment>
	)
}

export default Fact;