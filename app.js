const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
	next();
});

//USER ROUTES
app.use('/auth', require('./routes/jwtAuth'));

//DASHBOARD (TODOS) ROUTE 
app.use('/dashboard', require('./routes/dashboard'));

app.listen(port, () => {
	console.log(`App running on port ${port}`);
});

