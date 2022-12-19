const Pool = require('pg').Pool

const pool = new Pool({
	user: 'havafeder',
	host: 'localhost',
	database: 'todolist',
	password: 'root',
	port: 5432,
});

module.exports = pool; 