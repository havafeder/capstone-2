const router = require('express').Router();
const pool = require('../db');
const jwtCreator = require('../utils/jwtCreator');
const validInfo = require('../middleware/validInfo');
const bcrypt = require('bcrypt');
const authorization = require('../middleware/authorization');


//register user
router.post('/register', validInfo, async (req, res) => {
	try {
		//destructure req.body

		const { name, email, password } = req.body;

		//check if user exists (if yes throw error)

		const user = await pool.query('SELECT user_email FROM users WHERE user_email = $1',
		[email]);

		if (user.rows.length !== 0) {
			return res.status(401).send('User already exists');
		};

		//bcrypt user password

		const saltRound = 10;
		const salt = await bcrypt.genSalt(saltRound);

		const bcryptPassword = await bcrypt.hash(password, salt);
		
		//enter new user insidedatabase

		const newUser = await pool.query('INSERT INTO users (username, user_email, user_password) VALUES ($1, $2, $3) RETURNING user_id',
			[name, email, bcryptPassword]);

		//generate jwt token

		const token = jwtCreator(newUser.rows[0].user_id);

		res.json({token})

	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//login user
router.post('/login', validInfo, async (req, res) => {
	try {
		//destructure req.body

		const { email, password } = req.body;

		//check if user does not exist (if not throw error)

		const user = await pool.query('SELECT * FROM users WHERE user_email = $1',
			[email]);

		if (user.rows.length === 0) {
			return res.status(401).json('Password or Email is incorrect')
		}

		//check if password is same as database password

		const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

		if (!validPassword) {
			return res.status(401).json('Password or email is incorrect');
		};
	
		//give user jwt token

		const token = jwtCreator(user.rows[0].user_id);

		res.json({ token });


	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//update user 
router.put('/edit', authorization, validInfo, async (req, res) => {
	try {
		const { name, email } = req.body;
		const updateUser = await pool.query(
			'UPDATE users SET username = $1, user_email = $2 WHERE user_id = $3 RETURNING username, user_email',
			[name, email, req.user.id]);

		return res.json(updateUser.rows[0])
	} catch (err) {
		console.error(err.message);
	}
});

//verify jwt token

router.get('/is-verify', authorization,  async (req, res) => {
	try {
		res.json(true);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});



module.exports = router;
