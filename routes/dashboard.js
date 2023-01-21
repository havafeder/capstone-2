const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

//get all todos and username of user
router.get('/', authorization, async (req, res) => {
	try {
		
		const user = await pool.query(
			'SELECT u.username, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1',
			[req.user.id]
		);

		res.json(user.rows);
	} catch (err) {
		console.error(err.message);
		res.status(400).json('Server Error');
	}
});

//create todo
router.post('/todos', authorization, async (req, res) => {
	try {
		const { description } = req.body;
		const newTodo = await pool.query(
			'INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *',
			[req.user.id, description]
		)

		res.json(newTodo.rows[0])
	} catch (err) {
		console.error(err.message);
	}
});

//update a todo
router.put('/todos/:id', [check('id').trim().escape(), check('description').trim().escape()], authorization, async (req, res) => {
	try {
		const { id } = req.params;
		const { description } = req.body;
		const updateTodo = await pool.query(
			'UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *',
			[description, id, req.user.id]);
		
		if (updateTodo.rows.length === 0) {
			return res.status(404).json('This todo is not yours');
		} else {
			return res.json('Todo was updated');
		};

	} catch (err) {
		console.error(err.message)
	}
});

//delete a todo
router.delete('/todos/:id', authorization, async (req, res) => {
	try {
		const {id} = req.params;
		const deleteTodo = await pool.query(
			'DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *',
			[id, req.user.id]
		);

		if (deleteTodo.rows.length === 0) {
			return res.status(404).json('This todo is not yours');
		} else {
			return res.json('Todo was deleted.')
		};
		
	} catch (err) {
		console.error(err.message);
	}
});


module.exports = router;
